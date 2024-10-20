export type StorageRoomsBrief = {
  id: string;
  room: string;
  description: string;
  locations: RoomLocationBrief[];
  total_substances: number;
};

export type RoomLocationBrief = {
  location_id: string;
  location_name: string;
};
