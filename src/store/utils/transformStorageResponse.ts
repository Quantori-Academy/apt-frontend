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
  roomId: location.room_id,
  locationId: location.location_id,
  roomName: location.room_name,
  locationName: location.location_name,
  substances: location.substances.map((substance) => ({
    substanceId: substance.substance_id,
    name: substance.name,
    description: substance.description,
    structureSmiles: substance.structure_smiles,
  })),
});
