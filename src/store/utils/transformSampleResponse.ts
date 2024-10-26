import { BackendSample, Sample } from "@/types";

export const transformSampleResponse = (sample: BackendSample): Sample => ({
  substanceId: String(sample.substance_id),
  name: sample.name,
  description: sample.description,
  structure: sample.structure,
  category: sample.category,
  totalQuantityLeft: sample.total_quantity_left,
  unit: sample.unit,
  pricePerUnit: sample.price_per_unit,
  locationId: String(sample.location_id),
  addedSubstances: sample.added_substances,
});
