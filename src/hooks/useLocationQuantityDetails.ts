import { useEffect, useState } from "react";

import { RoomData, RoomLocationBrief, StorageRoomsBrief } from "@/types";
import { Reagent } from "@/types/reagent";

export const useLocationQuantityDetails = (
  reagentDetails: Reagent,
  reagentLocationDetails: RoomData,
  rooms?: StorageRoomsBrief[]
) => {
  const [selectedRoom, setSelectedRoom] = useState<StorageRoomsBrief | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<RoomLocationBrief | null>(null);
  const [quantityLeft, setQuantityLeft] = useState("");

  useEffect(() => {
    if (reagentDetails && rooms?.length) {
      const currentRoom = rooms.find((room) => room.id === reagentLocationDetails.roomId);
      setSelectedRoom(currentRoom || null);

      if (currentRoom) {
        const currentLocation = currentRoom.locations.find(
          (location) => location.locationId === reagentLocationDetails.locationId
        );
        setSelectedLocation(currentLocation || null);
      }
    }

    if (reagentDetails && reagentDetails.totalQuantityLeft !== undefined) {
      setQuantityLeft(String(reagentDetails.totalQuantityLeft));
    }
  }, [reagentDetails, reagentLocationDetails, rooms]);

  return { selectedRoom, setSelectedRoom, selectedLocation, setSelectedLocation, quantityLeft, setQuantityLeft };
};
