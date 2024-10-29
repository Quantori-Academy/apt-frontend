import { ReagentData } from "@/types";

export const transformReagentData = (reagent: ReagentData) => ({
  name: reagent.name,
  description: reagent.description,
  structure: reagent.structure,
  price_per_unit: reagent.pricePerUnit || 0,
  quantity_unit: reagent.quantityUnit || "mL",
  quantity_left: reagent.quantityLeft || 0,
  expiration_date: reagent.expirationDate || new Date().toISOString(),
  location_id: reagent.locationId || 0,
  cas_number: reagent.casNumber,
  producer: reagent.producer,
  catalog_id: reagent.catalogId || 0,
  catalog_link: reagent.catalogLink || "",
});
