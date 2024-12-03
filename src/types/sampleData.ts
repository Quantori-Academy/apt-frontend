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
  added_substance_id: number;
  added_substance_quantity: number;
  added_substance_unit: string;
};
