export interface StorageRoomsBrief {
  id: number;
  storage_room: string;
  locations: RoomLocationBrief[];
  total_substances: number;
}

export interface RoomLocationBrief {
  id: number;
  location: string;
  place: string;
}
export interface RoomData {
  storage_room: string;
  substances: {
    substance_id: number;
    name: string;
    description: string;
    structure_smiles: string;
    location: string;
    place: string;
  }[];
}
