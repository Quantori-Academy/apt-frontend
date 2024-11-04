type OrderStatus = "Pending" | "Submitted" | "Fulfilled" | "Cancelled";

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
  unit: string;
  quantity: string;
  pricePerUnit: string;
  structure?: string;
  CASNumber?: string;
  producer?: string;
  catalogId?: string;
  catalogLink?: string;
};

export type BackendOrderReagent = {
  reagent_name: string;
  unit: string;
  quantity: string;
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

export type SortType = "asc" | "desc";

export type StatusFilter = Capitalize<OrderStatus> | "All";
