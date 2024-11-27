import { SampleData } from "@/types/sampleData";

export const transformSampleData = (sample: SampleData) => ({
  name: sample.name,
  description: sample.description,
  structure: sample.structure,
  price_per_unit: sample.pricePerUnit || 0,
  quantity_unit: sample.quantityUnit || "mL",
  quantity_left: sample.quantityLeft || 0,
  expiration_date: sample.expirationDate || new Date().toISOString(),
  location_id: sample.locationId || 0,
  added_substance_ids: sample.addedSubstanceIds || [],
});
