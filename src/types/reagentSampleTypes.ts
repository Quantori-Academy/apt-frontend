export type ReagentCategory = "Reagent" | "Sample";

export type ReagentDetails = {
  name: string;
  category: ReagentCategory;
  structure: string;
  description: string;
  quantityLeft: string;
  storageLocation: string;
};
