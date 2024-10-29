type OrderStatus = "pending" | "ordered" | "completed";

export type Order = {
  id: number;
  title: string;
  creationDate: string;
  seller: string;
  status: OrderStatus;
};

export type SortType = "asc" | "desc";
