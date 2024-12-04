import { BackendReagent, Reagent } from "@/types";

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
  expirationDate: reagent.expiration_date,
  totalQuantityLeft: reagent.total_quantity_left,
  locations:
    reagent.locations?.map((location) => ({
      contentId: location.content_id,
      locationId: location.location_id,
      room: location.room,
      location: location.location,
      quantityLeft: location.quantity_left,
      pricePerUnit: location.price_per_unit,
    })) ?? null,
});
