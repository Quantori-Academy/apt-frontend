import { SampleData } from "@/types/sampleData";

export const transformSampleData = (sample: SampleData) => ({
  name: sample.name,
  description: sample.description || null,
  structure: sample.structure || null,
  unit: sample.unit || null,
  initial_quantity: sample.initialQuantity || 0,
  amount: sample.amount || 0,
  expiration_date: sample.expirationDate || new Date().toISOString(),
  location_id: sample.locationId || 0,
  added_substances:
    sample.addedSubstances?.map((substance) => ({
      added_substance_id: substance.addedSubstanceId,
      added_substance_quantity: substance.addedSubstanceQuantity || 0,
      added_substance_unit: substance.addedSubstanceUnit || null,
    })) || [],
});
