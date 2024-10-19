export type StorageRoomsBrief = {
  id: number;
  room: string;
  description: string;
  locations: RoomLocationBrief[];
  total_substances: number;
};

export type RoomLocationBrief = {
  location_id: number;
  location_name: string;
};
