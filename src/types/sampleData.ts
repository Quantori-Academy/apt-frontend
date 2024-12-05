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
  addedSubstanceId: number | null;
  addedSubstanceLocationId: number | null;
  addedSubstanceQuantity: number;
  addedSubstanceUnit: string;
};

export type AddedSubstanceDetails = {
  locationId: number;
  name: string;
  location: string;
  quantity: string;
};
