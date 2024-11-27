export type StorageRoomsBrief = {
  id: string;
  room: string;
  description: string;
  locations: RoomLocationBrief[];
  totalSubstances: number;
};

export type UpdateStorageRoom = Pick<StorageRoomsBrief, "id" | "room" | "description">;

export type RoomLocationBrief = {
  locationId: string;
  locationName: string;
};

export type RoomData = {
  roomId: string;
  locationId: string;
  roomName: string;
  locationName: string;
  substances: Substance[];
};

export type BackendRoomLocationBrief = {
  location_id: string;
  location_name: string;
};

export type BackendStorageRoomsBrief = Omit<StorageRoomsBrief, "locations" | "totalSubstances"> & {
  locations: BackendRoomLocationBrief[];
  total_substances: number;
};

export type NewStorageRoom = Pick<StorageRoomsBrief, "room" | "description">;

export type NewRoom = Pick<RoomData, "roomId" | "locationName">;

export type Substance = {
  substanceId: string;
  name: string;
  description: string;
  structureSmiles: string;
};

export type BackendRoomData = {
  room_id: string;
  location_id: string;
  room_name: string;
  location_name: string;
  substances: BackendSubstance[];
};

export type BackendSubstance = {
  substance_id: string;
  name: string;
  description: string;
  structure_smiles: string;
};

export type SubstancesInLocation = {
  description: string;
  name: string;
  structureSmiles: string;
  substanceId: string;
};

export type LocationDetails = {
  locationId: string;
  locationName: string;
  roomId: string;
  roomName: string;
  substances: Array<SubstancesInLocation>;
};

export type MoveSubstance = {
  oldRoomId: string;
  substanceId: string;
  newLocationId?: string;
};
