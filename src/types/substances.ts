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
