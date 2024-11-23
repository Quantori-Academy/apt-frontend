export type SampleData = {
  name: string;
  description: string;
  pricePerUnit: number;
  quantityUnit: string;
  quantityLeft: number;
  expirationDate: string;
  locationId: number;
  addedSubstanceIds: number[];
  structure?: string | null;
};
