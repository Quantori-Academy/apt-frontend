import { useEffect, useState } from "react";

import { RoomData, RoomLocationBrief, StorageRoomsBrief } from "@/types";

type useLocationDetailsProps = {
  substanceLocationDetails?: RoomData;
  rooms?: StorageRoomsBrief[];
};

export const useLocationDetails = ({ substanceLocationDetails, rooms }: useLocationDetailsProps) => {
  const [selectedRoom, setSelectedRoom] = useState<StorageRoomsBrief | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<RoomLocationBrief | null>(null);

  useEffect(() => {
    if (substanceLocationDetails && rooms?.length) {
      const currentRoom = rooms.find((room) => room.id == substanceLocationDetails.roomId);
      setSelectedRoom(currentRoom || null);

      if (currentRoom) {
        const currentLocation = currentRoom.locations.find(
          (location) => location.locationId == substanceLocationDetails.locationId
        );
        setSelectedLocation(currentLocation || null);
      }
    }
  }, [substanceLocationDetails, rooms]);

  return { selectedRoom, setSelectedRoom, selectedLocation, setSelectedLocation };
};
