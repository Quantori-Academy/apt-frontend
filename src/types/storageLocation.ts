export type StorageRoomsBrief = {
  id: number;
  room: string;
  description: string;
  locations: RoomLocationBrief[];
  totalSubstances: number;
};

export type RoomLocationBrief = {
  locationId: number;
  locationName: string;
};

export type BackendRoomLocationBrief = {
  location_id: number;
  location_name: string;
};

export type BackendStorageRoomsBrief = Omit<StorageRoomsBrief, "locations" | "totalSubstances"> & {
  locations: BackendRoomLocationBrief[];
  total_substances: number;
};

export type RoomData = {
  roomId: number;
  locationId: number;
  roomName: string;
  locationName: string;
  substances: Substance[];
};

export type Substance = {
  substanceId: number;
  name: string;
  description: string;
  structureSmiles: string;
};

export type BackendRoomData = {
  room_id: number;
  location_id: number;
  room_name: string;
  location_name: string;
  substances: BackendSubstance[];
};

export type BackendSubstance = {
  substance_id: number;
  name: string;
  description: string;
  structure_smiles: string;
};
