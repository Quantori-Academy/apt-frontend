import { ORDER_STATUSES } from "@/constants";

export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];
export type StatusFilter = OrderStatus | "All";

export type StatusForm = {
  status: OrderStatus;
};

export type SortType = "asc" | "desc";

export type Order = {
  id: string;
  title: string;
  seller: string;
  status: OrderStatus;
  createdAt: string;
  modifiedAt: string;
};

export type BackendOrder = Omit<Order, "createdAt" | "modifiedAt"> & {
  created_at: string;
  modified_at: string;
};

export type OrderReagent = {
  id: number;
  reagentName: string;
  quantity: string;
  unit: string;
  pricePerUnit: string;
  structure?: string;
  CASNumber?: string;
  producer?: string;
  catalogId?: string | null;
  catalogLink?: string;
};

export type UpdatedReagent = OrderReagent & {
  orderId: string;
};

export type BackendOrderReagent = Pick<OrderReagent, "id" | "quantity" | "unit" | "structure" | "producer"> & {
  reagent_name: string;
  price_per_unit: string;
  cas_number?: string;
  catalog_id?: string | null;
  catalog_link?: string;
};

export type OrderInput = {
  title: string;
  seller: string;
  reagents: Omit<OrderReagent, "id">[];
};

export type BackendOrderInput = Omit<OrderInput, "reagents"> & {
  reagents: Omit<BackendOrderReagent, "id">[];
};

export type OrderDetailPage = Order & {
  orderedReagents: OrderReagent[];
};

export type BackendOrderDetailPage = BackendOrder & {
  ordered_reagents: BackendOrderReagent[];
};
