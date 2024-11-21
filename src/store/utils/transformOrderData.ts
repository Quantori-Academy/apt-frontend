import { BackendOrderInput, OrderInput } from "@/types";
import { BackendOrderReagent, UpdatedReagent } from "@/types";

export const transformOrderData = (orderData: OrderInput): BackendOrderInput => ({
  ...(orderData.title && { title: orderData.title }),
  ...(orderData.seller && { seller: orderData.seller }),
  request_ids: orderData.requestIds || [],
  reagents: orderData.reagents.map((reagent) => ({
    reagent_name: reagent.reagentName,
    unit: reagent.unit,
    quantity: reagent.quantity,
    price_per_unit: reagent.pricePerUnit,
    structure: reagent.structure,
    cas_number: reagent.CASNumber,
    producer: reagent.producer,
    catalog_id: reagent.catalogId || "0",
    catalog_link: reagent.catalogLink,
  })),
});

export const transformOrderReagentData = (orderReagentData: UpdatedReagent): Omit<BackendOrderReagent, "id"> => ({
  reagent_name: orderReagentData.reagentName,
  quantity: orderReagentData.quantity,
  unit: orderReagentData.unit,
  price_per_unit: orderReagentData.pricePerUnit,
  structure: orderReagentData.structure,
  cas_number: orderReagentData.CASNumber,
  producer: orderReagentData.producer,
  catalog_id: orderReagentData.catalogId,
  catalog_link: orderReagentData.catalogLink,
});
