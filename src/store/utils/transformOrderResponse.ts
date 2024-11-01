import { BackendOrder, Order } from "@/types";

export const transformOrderResponse = (order: BackendOrder): Order => ({
  id: order.id,
  title: order.title,
  creationDate: order.creation_date,
  seller: order.seller,
  status: order.status,
});
