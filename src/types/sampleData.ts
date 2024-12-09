export type SampleData = {
  name: string;
  description: string;
  unit: string;
  initialQuantity: number | null;
  amount: number | null;
  expirationDate: string;
  locationId: number | null;
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
  substanceId: number;
  name: string;
  location: string;
  quantity: string;
};
