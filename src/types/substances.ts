export type SubstancesCategory = "Reagent" | "Sample";

export type SubstancesDetails = {
  id: number;
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

export type Reagent = {
  reagentID: string;
  name: string;
  category: string;
  description: string;
  structure: string;
  CASNumber: string;
  producer: string;
  catalogID: string;
  catalogLink: string;
  storageLocation: string;
  units: string;
  pricePerUnit: number;
  quantity: number;
};
