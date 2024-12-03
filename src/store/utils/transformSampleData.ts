import { SampleData } from "@/types/sampleData";

export const transformSampleData = (sample: SampleData) => ({
  name: sample.name,
  description: sample.description,
  structure: sample.structure,
  unit: sample.unit || "",
  initial_quantity: sample.initialQuantity,
  amount: sample.amount,
  expiration_date: sample.expirationDate || "",
  location_id: sample.locationId || 0,
  added_substances: sample.addedSubstances || [],
});
