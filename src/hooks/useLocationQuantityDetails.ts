import { useEffect, useState } from "react";

import { Reagent, RoomData, RoomLocationBrief, Sample, StorageRoomsBrief } from "@/types";

export const useLocationQuantityDetails = (
  substanceDetails: Reagent | Sample,
  substanceLocationDetails: RoomData,
  rooms?: StorageRoomsBrief[]
) => {
  const [selectedRoom, setSelectedRoom] = useState<StorageRoomsBrief | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<RoomLocationBrief | null>(null);
  const [quantityLeft, setQuantityLeft] = useState("");

  useEffect(() => {
    if (substanceDetails && rooms?.length) {
      const currentRoom = rooms.find((room) => room.id === substanceLocationDetails.roomId);
      setSelectedRoom(currentRoom || null);

      if (currentRoom) {
        const currentLocation = currentRoom.locations.find(
          (location) => location.locationId === substanceLocationDetails.locationId
        );
        setSelectedLocation(currentLocation || null);
      }
    }

    if (substanceDetails && substanceDetails.totalQuantityLeft !== undefined) {
      setQuantityLeft(String(substanceDetails.totalQuantityLeft));
    }
  }, [substanceDetails, substanceLocationDetails, rooms]);

  return { selectedRoom, setSelectedRoom, selectedLocation, setSelectedLocation, quantityLeft, setQuantityLeft };
};
