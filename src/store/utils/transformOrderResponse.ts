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
  orderedReagents: orderDetail.ordered_reagents.map((order) => ({
    reagentName: order.reagent_name,
    quantity: order.quantity,
    unit: order.unit,
    pricePerUnit: order.price_per_unit,
    structure: order.structure,
    CASNumber: order.cas_number,
    producer: order.producer,
    catalogId: order.catalog_id,
    catalogLink: order.catalog_link,
  })),
});
