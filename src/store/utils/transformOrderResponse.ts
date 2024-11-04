import { BackendOrder, Order } from "@/types";

export const transformOrderResponse = (order: BackendOrder): Order => ({
  id: order.id,
  title: order.title,
  seller: order.seller,
  status: order.status,
  createdAt: order.created_at,
  modifiedAt: order.modified_at,
});
