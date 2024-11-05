import { CategoryFilterOption, ExpiredFilter, SortColumn, SortDirection, SubstancesDetails } from "@/types";

type GetListDataOptions = {
  items: Array<SubstancesDetails>;
  searchQuery: string;
  categoryFilter: CategoryFilterOption;
  expiredFilter: ExpiredFilter;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  page: number;
  pageSize: number;
};

export const getListData = ({
  expiredFilter,
  categoryFilter,
  searchQuery,
  pageSize,
  page,
  sortDirection,
  sortColumn,
  items,
}: GetListDataOptions) => {
  const filtered = filterListData(items, categoryFilter, searchQuery, expiredFilter);
  const sorted = sortListData(filtered, sortColumn, sortDirection);
  const paginated = paginateListData(sorted, page, pageSize);

  return { visibleItems: paginated, totalPages: sorted.length };
};

const filterListData = (
  items: Array<SubstancesDetails>,
  categoryFilter: CategoryFilterOption,
  searchQuery: string,
  expiredFilter: ExpiredFilter
) => {
  return items.filter((item) => {
    const satisfiesExpired = expiredFilter === "All" || item.isExpired;
    const satisfiesCategory = categoryFilter === "All" || item.category === categoryFilter;
    const satisfiesSearch =
      item.name.toLowerCase().includes(searchQuery) ||
      item.structure.toLowerCase().includes(searchQuery) ||
      item.storageLocation.toLowerCase().includes(searchQuery);

    return satisfiesExpired && satisfiesCategory && satisfiesSearch;
  });
};

const sortListData = (items: Array<SubstancesDetails>, sortColumn: SortColumn, sortDirection: SortDirection) => {
  return items.toSorted((a, b) => {
    const order = a[sortColumn].localeCompare(b[sortColumn]);
    return sortDirection === "asc" ? order : -1 * order;
  });
};

const paginateListData = (items: Array<SubstancesDetails>, page: number, pageSize: number) => {
  return items.slice(page * pageSize, (page + 1) * pageSize);
};
