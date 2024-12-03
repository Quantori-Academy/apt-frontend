export type SampleData = {
  name: string;
  description: string;
  unit: string;
  initialQuantity: number;
  amount: number;
  expirationDate: string;
  locationId: number;
  addedSubstances: SampleSubstances[];
  structure?: string | null;
};

export type SampleSubstances = {
  addedSubstanceId: number;
  addedSubstanceQuantity: number;
  addedSubstanceUnit: string;
};
