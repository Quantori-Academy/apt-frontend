export interface StorageRoomsBrief {
  id: number;
  room: string;
  description: string;
  locations: RoomLocationBrief[];
  total_substances: number;
}

export interface RoomLocationBrief {
  location_id: number;
  location_name: string;
}

export interface RoomData {
  room_id: number;
  location_id: number;
  room_name: string;
  location_name: string;
  substances: Substance[];
}
export interface Substance {
  substance_id: number;
  name: string;
  description: string;
  structure_smiles: string;
}
