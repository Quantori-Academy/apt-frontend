import { BackEndSample, FrontEndSample } from "@/types/sample";

export const transformSampleResponse = (sample: BackEndSample): FrontEndSample => ({
  substanceId: sample.substance_id,
  name: sample.name,
  description: sample.description,
  structure: sample.structure,
  category: sample.category,
  totalQuantityLeft: sample.total_quantity_left,
  unit: sample.unit,
  pricePerUnit: sample.price_per_unit,
  locationId: sample.location_id,
  addedSubstances: sample.added_substances,
});
