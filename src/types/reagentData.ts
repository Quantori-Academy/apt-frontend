export type ReagentData = {
  name: string;
  description: string;
  pricePerUnit: number;
  quantityUnit: string;
  quantityLeft: number;
  expirationDate: string;
  locationId: string;
  casNumber: string;
  producer: string;
  catalogId: number;
  catalogLink: string;
  structure?: string | null;
};
