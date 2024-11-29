export type SampleData = {
  name: string;
  description: string | null;
  unit: string;
  initialQuantity: number;
  amount: number;
  expirationDate: string;
  locationId: number;
  addedSubstances: {
    addedSubstanceId: number;
    addedSubstanceQuantity: number;
    addedSubstanceUnit: string;
  }[];
  structure?: string | null;
};
