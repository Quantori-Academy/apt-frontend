export type FrontStorageRoomsBrief = {
  id: number;
  room: string;
  description: string;
  locations: FrontRoomLocationBrief[];
  totalSubstances: number;
};

export type FrontRoomLocationBrief = {
  locationId: number;
  locationName: string;
};

export type BackRoomLocationBrief = {
  location_id: number;
  location_name: string;
};

export type BackStorageRoomsBrief = Omit<FrontStorageRoomsBrief, "locations" | "totalSubstances"> & {
  locations: BackRoomLocationBrief[];
  total_substances: number;
};

export type FrontRoomData = {
  roomId: number;
  locationId: number;
  roomName: string;
  locationName: string;
  substances: FrontSubstance[];
};

export type FrontSubstance = {
  substanceId: number;
  name: string;
  description: string;
  structureSmiles: string;
};

export type BackRoomData = {
  room_id: number;
  location_id: number;
  room_name: string;
  location_name: string;
  substances: BackSubstance[];
};

export type BackSubstance = {
  substance_id: number;
  name: string;
  description: string;
  structure_smiles: string;
};
