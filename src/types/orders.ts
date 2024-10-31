type OrderStatus = "pending" | "submitted" | "fulfilled" | "canceled";

export type Order = {
  id: number;
  title: string;
  creationDate: string;
  seller: string;
  status: OrderStatus;
};

export type SortType = "asc" | "desc";

export type StatusFilter = Capitalize<OrderStatus> | "All";
