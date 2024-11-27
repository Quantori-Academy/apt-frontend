import { ReagentRequests, RequestsSortColumns, SortDirection, StatusFilterOption } from "@/types";

type GetListDataOptions = {
  pageSize: number;
  page: number;
  sortDirection: SortDirection;
  sortColumn: RequestsSortColumns;
  searchQuery: string;
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
  searchQuery,
}: GetListDataOptions) => {
  const filtered = filterListData(items, statusFilter, searchQuery);
  const sorted = sortListData(filtered, sortColumn, sortDirection);
  const paginated = paginateListData(sorted, page, pageSize);

  return { visibleItems: paginated, totalPages: sorted.length };
};

const filterListData = (items: ReagentRequests, statusFilter: StatusFilterOption, searchQuery: string) => {
  return items.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesSearch = searchQuery === "" || item.name.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });
};

const sortListData = (items: ReagentRequests, sortColumn: RequestsSortColumns, sortDirection: SortDirection) => {
  return items.toSorted((a, b) => {
    const order = a[sortColumn].localeCompare(b[sortColumn]);
    return sortDirection === "asc" ? order : -1 * order;
  });
};

const paginateListData = (items: ReagentRequests, page: number, pageSize: number) => {
  return items.slice(page * pageSize, (page + 1) * pageSize);
};
