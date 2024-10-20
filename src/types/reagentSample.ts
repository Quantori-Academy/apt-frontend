export type ReagentCategory = "Reagent" | "Sample";

export type ReagentDetails = {
  name: string;
  category: ReagentCategory;
  structure: string;
  description: string;
  quantityLeft: string;
  storageLocation: string;
  isExpired: boolean;
};
export type CategoryFilterOption = ReagentCategory | "All";
export type SortDirection = "asc" | "desc";
export type SortColumn = "name" | "category";
export type ExpiredFilter = "All" | "Expired";
