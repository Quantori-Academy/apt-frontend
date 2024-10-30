import { Order, SortType } from "@/types";

type GetOrdersRowsArgs = {
  orders: Order[];
  sortType: SortType;
  orderBy: keyof Order;
  page: number;
  rowsPerPage: number;
};

export const getOrdersRows = ({ orders, sortType, orderBy, page, rowsPerPage }: GetOrdersRowsArgs) => {
  const sortedOrders = orders.slice().sort((a, b) => {
    const comparison = String(a[orderBy]).localeCompare(String(b[orderBy]));
    return sortType === "asc" ? comparison : -comparison;
  });

  return sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};
