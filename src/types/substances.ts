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
