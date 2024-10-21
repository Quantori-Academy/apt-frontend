import { useEffect, useState } from "react";

import { FrontEndReagent, FrontRoomData, FrontRoomLocationBrief, FrontStorageRoomsBrief } from "@/types";

export const useLocationQuantityDetails = (
  reagentDetails: FrontEndReagent,
  reagentLocationDetails: FrontRoomData,
  rooms?: FrontStorageRoomsBrief[]
) => {
  const [selectedRoom, setSelectedRoom] = useState<FrontStorageRoomsBrief | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<FrontRoomLocationBrief | null>(null);

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
