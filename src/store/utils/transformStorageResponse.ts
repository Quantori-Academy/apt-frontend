import { BackendRoomData, BackendStorageRoomsBrief, RoomData, StorageRoomsBrief } from "@/types";

export const transformStorageRoomsResponse = (room: BackendStorageRoomsBrief): StorageRoomsBrief => ({
  id: room.id,
  room: room.room,
  description: room.description,
  locations: room.locations.map((location) => ({
    locationId: location.location_id,
    locationName: location.location_name,
  })),
  totalSubstances: room.total_substances,
});

export const transformStorageLocationResponse = (location: BackendRoomData): RoomData => ({
  roomId: String(location.room_id),
  locationId: String(location.location_id),
  roomName: location.room_name,
  locationName: location.location_name,
  substances: location.substances.map((substance) => ({
    id: String(substance.id),
    name: substance.name,
    description: substance.description,
    structure: substance.structure || "",
    category: substance.category,
    isExpired: substance.is_expired,
    expirationDate: substance.expiration_date,
    quantityLeft: `${substance.quantity_left} ${substance.unit}`,
  })),
});
