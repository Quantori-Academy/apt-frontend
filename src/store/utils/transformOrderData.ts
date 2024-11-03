import { BackendOrderInput, OrderInput } from "@/types";

export const transformOrderData = (orderData: OrderInput): BackendOrderInput => ({
  title: orderData.title,
  seller: orderData.seller,
  reagents: orderData.reagents.map((reagent) => ({
    reagent_name: reagent.reagentName,
    unit: reagent.unit,
    quantity: reagent.quantity,
    price_per_unit: reagent.pricePerUnit,
    structure: reagent.structure,
    cas_number: reagent.CASNumber,
    producer: reagent.producer,
    catalog_id: reagent.catalogId || null,
    catalog_link: reagent.catalogLink,
  })),
});
