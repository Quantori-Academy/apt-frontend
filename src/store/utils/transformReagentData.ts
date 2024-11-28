import { ReagentData } from "@/types";

export const transformReagentData = (reagent: ReagentData) => ({
  name: reagent.name,
  description: reagent.description || null,
  structure: reagent.structure || null,
  price_per_unit: reagent.pricePerUnit || 0,
  unit: reagent.unit || "mL",
  amount: reagent.amount || 0,
  initial_quantity: reagent.initialQuantity || 0,
  expiration_date: reagent.expirationDate || new Date().toISOString(),
  location_id: reagent.locationId || 0,
  cas_number: reagent.casNumber || null,
  producer: reagent.producer || null,
  catalog_id: reagent.catalogId || 0,
  catalog_link: reagent.catalogLink || "",
});
