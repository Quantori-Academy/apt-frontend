type OrderStatus = "pending" | "submitted" | "fulfilled" | "canceled";

export type Order = {
  id: number;
  title: string;
  creationDate: string;
  seller: string;
  status: OrderStatus;
};

export type BackendOrder = Omit<Order, "creationDate"> & {
  creation_date: string;
};

type OrderReagent = {
  name: string;
  units: string;
  quantity: string;
  price: string;
  structure?: string;
  CAS?: string;
  producer?: string;
  catalogId?: string;
  catalogLink?: string;
};

export type OrderInput = {
  title: string;
  seller: string;
  orderReagents: OrderReagent[];
};

export type SortType = "asc" | "desc";

export type StatusFilter = Capitalize<OrderStatus> | "All";
