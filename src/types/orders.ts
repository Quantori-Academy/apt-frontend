type OrderStatus = "Pending" | "Submitted" | "Fulfilled" | "Cancelled";
export type StatusFilter = Capitalize<OrderStatus> | "All";
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

type OrderReagent = {
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

export type BackendOrderReagent = {
  reagent_name: string;
  quantity: string;
  unit: string;
  price_per_unit: string;
  structure?: string;
  cas_number?: string;
  producer?: string;
  catalog_id?: string | null;
  catalog_link?: string;
};

export type OrderInput = {
  title: string;
  seller: string;
  reagents: OrderReagent[];
};

export type BackendOrderInput = Omit<OrderInput, "reagents"> & {
  reagents: BackendOrderReagent[];
};

export type OrderDetailPage = Order & {
  orderedReagents: OrderReagent[];
};

export type BackendOrderDetailPage = BackendOrder & {
  ordered_reagents: BackendOrderReagent[];
};
