import { BackendOrderInput, BackendOrderReagent, OrderInput, OrderReagent } from "@/types";

export const transformOrderData = (orderData: OrderInput): BackendOrderInput => {
  const isOrderCreation = !!orderData.title;

  return {
    ...(isOrderCreation && { title: orderData.title }),
    ...(isOrderCreation && { seller: orderData.seller ?? null }),
    request_ids: orderData.requestIds || [],
    reagents: orderData.reagents.map((reagent) => transformOrderReagentData(reagent)),
  };
};

export const transformOrderReagentData = (
  orderReagentData: Omit<OrderReagent, "id">
): Omit<BackendOrderReagent, "id"> => {
  console.log(orderReagentData, "data to backend");
  return {
    reagent_name: orderReagentData.reagentName,
    unit: orderReagentData.unit,
    initial_quantity: Number(orderReagentData.quantity),
    price_per_unit: orderReagentData.pricePerUnit,
    amount: orderReagentData.amount,
    from_request: orderReagentData.fromRequest,
    structure: orderReagentData.structure || null,
    cas_number: orderReagentData.CASNumber || null,
    producer: orderReagentData.producer || null,
    catalog_id: orderReagentData.catalogId || null,
    catalog_link: orderReagentData.catalogLink || null,
  };
};
