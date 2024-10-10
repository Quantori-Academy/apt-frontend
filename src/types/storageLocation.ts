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
