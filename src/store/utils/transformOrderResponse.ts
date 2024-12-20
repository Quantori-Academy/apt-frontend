import { BackendOrder, BackendOrderDetailPage, Order, OrderDetailPage } from "@/types";

export const transformOrderResponse = (order: BackendOrder): Order => ({
  id: order.id,
  title: order.title,
  seller: order.seller,
  status: order.status,
  createdAt: order.created_at,
  modifiedAt: order.modified_at,
});

export const transformOrderDetailResponse = (orderDetail: BackendOrderDetailPage): OrderDetailPage => ({
  id: orderDetail.id,
  title: orderDetail.title,
  seller: orderDetail.seller,
  status: orderDetail.status,
  createdAt: orderDetail.created_at,
  modifiedAt: orderDetail.modified_at,
  orderedReagents: orderDetail.ordered_reagents.map((reagent) => ({
    id: reagent.id,
    reagentName: reagent.reagent_name,
    quantity: String(reagent.initial_quantity),
    amount: reagent.amount,
    fromRequest: reagent.from_request,
    unit: reagent.unit,
    pricePerUnit: reagent.price_per_unit,
    isAllocated: reagent.is_allocated,
    structure: reagent.structure ?? "",
    CASNumber: reagent.cas_number ?? "",
    producer: reagent.producer ?? "",
    catalogId: reagent.catalog_id ?? "",
    catalogLink: reagent.catalog_link ?? "",
  })),
});
