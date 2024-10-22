import { BackendReagent, Reagent } from "@/types/reagent.ts";

export const transformReagentResponse = (reagent: BackendReagent): Reagent => ({
  substanceId: reagent.substance_id,
  name: reagent.name,
  description: reagent.description,
  structure: reagent.structure,
  category: reagent.category,
  CASNumber: reagent.cas_number,
  producer: reagent.producer,
  catalogID: reagent.catalog_id,
  catalogLink: reagent.catalog_link,
  totalQuantityLeft: reagent.total_quantity_left,
  unit: reagent.unit,
  pricePerUnit: reagent.price_per_unit,
  locationId: reagent.location_id,
});
