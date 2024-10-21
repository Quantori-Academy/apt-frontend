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

export type BackEndRoomLocationBrief = {
  location_id: number;
  location_name: string;
};

export type BackEndStorageRoomsBrief = Omit<StorageRoomsBrief, "locations" | "totalSubstances"> & {
  locations: BackEndRoomLocationBrief[];
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

export type BackEndRoomData = {
  room_id: number;
  location_id: number;
  room_name: string;
  location_name: string;
  substances: BackEndSubstance[];
};

export type BackEndSubstance = {
  substance_id: number;
  name: string;
  description: string;
  structure_smiles: string;
};
