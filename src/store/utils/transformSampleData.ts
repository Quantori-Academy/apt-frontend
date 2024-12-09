import { SampleData } from "@/types";

export const transformSampleData = (sample: SampleData) => {
  const addedSubstances = sample.addedSubstances.map((substance) => {
    return {
      added_substance_id: substance.addedSubstanceId,
      added_substance_location_id: substance.addedSubstanceLocationId,
      added_substance_quantity: substance.addedSubstanceQuantity,
      added_substance_unit: substance.addedSubstanceUnit,
    };
  });
  return {
    name: sample.name,
    description: sample.description,
    structure: sample.structure,
    unit: sample.unit || "",
    initial_quantity: sample.initialQuantity,
    amount: sample.amount,
    expiration_date: sample.expirationDate || "",
    location_id: sample.locationId || 0,
    added_substances: addedSubstances,
  };
};
