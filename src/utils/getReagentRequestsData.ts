import { ReagentRequests, RequestsSortColumns, SortDirection, StatusFilterOption } from "@/types";

type GetListDataOptions = {
  pageSize: number;
  page: number;
  sortDirection: SortDirection;
  sortColumn: RequestsSortColumns;
  items: ReagentRequests;
  statusFilter: StatusFilterOption;
};

export const getRequestsListData = ({
  pageSize,
  page,
  sortDirection,
  sortColumn,
  items,
  statusFilter,
}: GetListDataOptions) => {
  const filtered = filterListData(items, statusFilter);
  const sorted = sortListData(filtered, sortColumn, sortDirection);
  const paginated = paginateListData(sorted, page, pageSize);

  const totalPages = Math.ceil(sorted.length / pageSize);

  return { visibleItems: paginated, totalPages };
};
const filterListData = (items: ReagentRequests, statusFilter: StatusFilterOption) => {
  if (statusFilter !== "All") {
    return items.filter((item) => item.status === statusFilter);
  } else return items;
};

const sortListData = (items: ReagentRequests, sortColumn: RequestsSortColumns, sortDirection: SortDirection) => {
  return items.toSorted((a, b) => {
    const order = a[sortColumn].localeCompare(b[sortColumn]);
    return sortDirection === "asc" ? order : -1 * order;
  });
};

const paginateListData = (items: ReagentRequests, page: number, pageSize: number) => {
  return items.slice((page - 1) * pageSize, page * pageSize);
};
