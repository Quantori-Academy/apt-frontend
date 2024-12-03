export type ReagentData = {
  name: string;
  description: string | null;
  pricePerUnit: number | null;
  unit: string;
  amount: number;
  expirationDate: string;
  initialQuantity: number;
  locationId: number;
  casNumber: string | null;
  producer: string | null;
  catalogId: number | null;
  catalogLink: string | null;
  structure?: string | null;
};
