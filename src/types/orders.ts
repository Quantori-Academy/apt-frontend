import { ORDER_STATUSES } from "@/constants";

export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];
export type StatusFilter = OrderStatus | "All";

export type StatusForm = {
  status: OrderStatus;
};

export type SortType = "asc" | "desc";

export type Order = {
  id: string;
  title: string | null;
  seller: string | null;
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
  amount: string;
  quantity: string;
  unit: string;
  pricePerUnit: string;
  fromRequest: boolean;
  structure?: string | null;
  CASNumber?: string | null;
  producer?: string | null;
  catalogId?: string | null;
  catalogLink?: string | null;
};

export type OrderReagentRowType = {
  label: string;
  key: keyof OrderReagent;
};

export type UpdatedReagent = OrderReagent & {
  orderId: string;
};

export type BackendOrderReagent = Pick<OrderReagent, "id" | "unit" | "amount" | "structure" | "producer"> & {
  reagent_name: string;
  initial_quantity: number;
  price_per_unit: string;
  from_request: boolean;
  cas_number?: string | null;
  catalog_id?: string | null;
  catalog_link?: string | null;
};

export type OrderInput = {
  title?: string;
  seller?: string | null;
  requestIds?: string[];
  reagents: Omit<OrderReagent, "id">[];
};

export type BackendOrderInput = Omit<OrderInput, "reagents" | "requestIds"> & {
  request_ids?: string[];
  reagents: Omit<BackendOrderReagent, "id">[];
};

export type OrderDetailPage = Order & {
  orderedReagents: OrderReagent[];
};

export type BackendOrderDetailPage = BackendOrder & {
  ordered_reagents: BackendOrderReagent[];
};
