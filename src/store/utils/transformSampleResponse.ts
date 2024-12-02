import { BackendSample, Sample } from "@/types";

export const transformSampleResponse = (sample: BackendSample): Sample => ({
  substanceId: String(sample.substance_id),
  name: sample.name,
  description: sample.description,
  structure: sample.structure,
  category: sample.category,
  totalQuantityLeft: sample.total_quantity_left,
  locations: sample.locations.map((location) => ({
    contentId: location.content_id,
    locationId: location.location_id,
    room: location.room,
    location: location.location,
    quantityLeft: location.quantity_left,
    pricePerUnit: location.price_per_unit,
  })),
  addedSubstances: sample.added_substances.map(({ added_amount, ...rest }) => ({
    ...rest,
    addedAmount: added_amount,
  })),
});
