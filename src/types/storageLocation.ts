import { SubstancesCategory, SubstancesDetails } from "@/types";

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
  substances: SubstancesDetails[];
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

export type BackendRoomData = {
  room_id: string;
  location_id: string;
  room_name: string;
  location_name: string;
  substances: BackendSubstance[];
};

export type BackendSubstance = {
  id: string;
  name: string;
  description: string;
  structure: string | null;
  category: SubstancesCategory;
  is_expired: boolean;
  expiration_date: string;
  quantity_left: number;
  unit: string;
};

export type LocationDetails = {
  locationId: string;
  locationName: string;
  roomId: string;
  roomName: string;
  substances: Array<SubstancesDetails>;
};

export type SubstancesTotalQuantityResponse = {
  substance_id: number;
  name: string;
  category: SubstancesCategory;
  locations: Array<SubstanceLocationsResponse>;
};

export type SubstanceLocationsResponse = {
  room: string;
  location_id: number;
  location: string;
  total_quantity_left: number;
  unit: string;
};

export type SubstancesTotalQuantity = {
  id: number;
  name: string;
  category: SubstancesCategory;
  locations: Array<SubstanceLocation>;
};

export type SubstanceLocation = {
  room: string;
  locationId: number;
  location: string;
  totalQuantityLeft: number;
  unit: string;
};
