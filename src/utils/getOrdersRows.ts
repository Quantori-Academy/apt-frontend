import { Order, SortType, StatusFilter } from "@/types";

type GetOrdersRowsArgs = {
  orders: Order[];
  sortType: SortType;
  orderBy: keyof Order;
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  statusFilter: StatusFilter;
};

export const getOrdersRows = ({
  orders,
  sortType,
  statusFilter,
  searchQuery,
  orderBy,
  page,
  rowsPerPage,
}: GetOrdersRowsArgs) => {
  const sortedOrders = orders.slice().sort((a, b) => {
    const comparison = String(a[orderBy]).localeCompare(String(b[orderBy]));
    return sortType === "asc" ? comparison : -comparison;
  });

  const lowerCaseQuery = searchQuery.toLowerCase();
  const filteredOrders = sortedOrders.filter((order) => {
    const matchesSearchQuery =
      order.createdAt.includes(lowerCaseQuery) ||
      order.modifiedAt?.includes(lowerCaseQuery) ||
      order.seller?.toLowerCase().includes(lowerCaseQuery) ||
      order.title!.toLowerCase().includes(lowerCaseQuery);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearchQuery && matchesStatus;
  });

  const visibleRows = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return { visibleRows, filteredOrders };
};
