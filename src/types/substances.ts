export type SubstancesCategory = "Reagent" | "Sample";

export type SubstancesDetails = {
  id: string;
  name: string;
  category: SubstancesCategory;
  structure: string;
  description: string;
  quantityLeft: string;
  storageLocation?: string;
  isExpired: boolean;
  unit?: string;
};
export type CategoryFilterOption = SubstancesCategory | "All";
export type SortDirection = "asc" | "desc";
export type SortColumn = "name" | "category";
export type ExpiredFilter = "All" | "Expired";

type LocationResponse = {
  room: string;
  location: string;
  quantity_left: number;
  unit: string;
};

export type StorageTotalQuantity = {
  id: number;
  name: string;
  category: SubstancesCategory;
  totalQuantityLeft: number;
  unit: string;
};

export type StorageTotalResponse = Array<{
  substance_id: number;
  name: string;
  category: "Reagent" | "Sample";
  total_quantity_left: string;
  unit: string;
}>;

export type SubstanceItemResponse = {
  unit: string;
  id: string;
  name: string;
  category: SubstancesCategory;
  description: string;
  structure: string;
  is_expired: boolean;
  location: LocationResponse;
};

export type SubstancesResponse = Array<SubstanceItemResponse>;

export type ReagentLocation = {
  contentId: number;
  locationId: number;
  room: string;
  location: string;
  quantityLeft: string;
  pricePerUnit?: string;
};

export type BackendReagentLocation = Pick<ReagentLocation, "room" | "location"> & {
  content_id: number;
  location_id: number;
  quantity_left: string;
  price_per_unit?: string;
};

export type Reagent = {
  substanceId: string;
  name: string;
  category: SubstancesCategory;
  CASNumber: string;
  producer: string;
  totalQuantityLeft: number;
  catalogID: number;
  catalogLink: string;
  description: string;
  structure: string;
  expirationDate: string | null;
  locations: ReagentLocation[] | null;
};

export type BackendReagent = Omit<
  Reagent,
  "substanceId" | "CASNumber" | "catalogID" | "catalogLink" | "totalQuantityLeft" | "locations" | "expirationDate"
> & {
  substance_id: string;
  cas_number: string;
  catalog_id: number;
  catalog_link: string;
  total_quantity_left: number;
  expiration_date: string | null;
  locations: BackendReagentLocation[] | null;
};

export type Sample = Omit<Reagent, "CASNumber" | "producer" | "catalogID" | "catalogLink"> & {
  addedSubstances: AddedSubstance[];
};

export type BackendSample = Omit<BackendReagent, "cas_number" | "catalog_id" | "catalog_link" | "producer"> & {
  added_substances: BackendAddedSubstance[];
};

export type AddedSubstance = {
  id: string;
  name: string;
  description: string;
  structure: string;
  category: string;
  addedAmount: string;
};

export type BackendAddedSubstance = Omit<AddedSubstance, "addedAmount"> & {
  added_amount: string;
};

export type LocationChangingIds = {
  storageContentId: number | null;
  currentLocationId: number | null;
};
