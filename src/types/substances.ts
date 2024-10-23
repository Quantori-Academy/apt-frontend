export type SubstancesCategory = "Reagent" | "Sample";

export type SubstancesDetails = {
  id: string;
  name: string;
  category: SubstancesCategory;
  structure: string;
  description: string;
  quantityLeft: string;
  storageLocation: string;
  isExpired: boolean;
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

export type SubstanceItemResponse = {
  id: string;
  name: string;
  description: string;
  structure: string;
  is_expired: boolean;
  locations: Array<LocationResponse>;
};

export type SubstancesResponse = {
  substances: {
    reagents: Array<SubstanceItemResponse>;
    samples: Array<SubstanceItemResponse>;
  };
};

export type Reagent = {
  substanceId: string;
  name: string;
  category: string;
  CASNumber: string;
  producer: string;
  locationId: number;
  unit: string;
  pricePerUnit: string;
  totalQuantityLeft: number;
  catalogID: number;
  catalogLink: string;
  description: string;
  structure: string;
};

export type BackendReagent = Omit<
  Reagent,
  "substanceId" | "CASNumber" | "catalogID" | "catalogLink" | "totalQuantityLeft" | "pricePerUnit" | "locationId"
> & {
  substance_id: string;
  cas_number: string;
  catalog_id: number;
  catalog_link: string;
  total_quantity_left: number;
  price_per_unit: string;
  location_id: number;
};

export type Sample = Omit<Reagent, "CASNumber" | "producer" | "catalogID" | "catalogLink"> & {
  addedSubstances: AddedSubstance[];
};

export type BackendSample = Omit<BackendReagent, "cas_number" | "catalog_id" | "catalog_link" | "producer"> & {
  added_substances: AddedSubstance[];
};

export type AddedSubstance = {
  id: number;
  name: string;
  description: string;
  structure: string;
  category: string;
};
