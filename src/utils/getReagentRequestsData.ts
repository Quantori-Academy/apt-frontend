import { ReagentRequests, RequestsSortColumns, SortDirection } from "@/types";

type GetListDataOptions = {
  pageSize: number;
  page: number;
  sortDirection: SortDirection;
  sortColumn: RequestsSortColumns;
  items: ReagentRequests;
};

export const getRequestsListData = ({ pageSize, page, sortDirection, sortColumn, items }: GetListDataOptions) => {
  const sorted = sortListData(items, sortColumn, sortDirection);
  const paginated = paginateListData(sorted, page, pageSize);

  const totalPages = Math.ceil(sorted.length / pageSize);

  return { visibleItems: paginated, totalPages };
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
