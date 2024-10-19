import { FilterOption } from "@/components/CategoryFilter/CategoryFilter";
import { ExpiredFilter, ReagentDetails, SortColumn, SortDirection } from "@/types";

export const getListData = (
  allItems: Array<ReagentDetails>,
  filter: FilterOption,
  sortColumn: SortColumn,
  sortDirection: SortDirection,
  page: number,
  searchQuery: string,
  expiredFilter: ExpiredFilter,
  pageSize: number
) => {
  const filtered = filter === "All" ? allItems : allItems.filter((item) => item.category === filter);

  const sorted = filtered.toSorted((a, b) => {
    const order = a[sortColumn].localeCompare(b[sortColumn]);
    return sortDirection === "asc" ? order : -1 * order;
  });

  const searchResult = sorted.filter(
    (item) => item.name.toLowerCase().includes(searchQuery) || item.structure.toLowerCase().includes(searchQuery)
  );

  const expired = sorted.filter((item) => item.isExpired);

  let paginated;
  let totalPages;

  if (expiredFilter === "Expired") {
    paginated = paginate(expired, page, pageSize);
    totalPages = Math.ceil(expired.length / pageSize);
  } else if (searchResult) {
    paginated = paginate(searchResult, page, pageSize);
    totalPages = Math.ceil(searchResult.length / pageSize);
  } else {
    paginated = paginate(sorted, page, pageSize);
    totalPages = Math.ceil(sorted.length / pageSize);
  }

  return {
    visibleItems: paginated,
    totalPages,
  };
};

const paginate = (data: Array<ReagentDetails>, page: number, pageSize: number) => {
  return data.slice((page - 1) * pageSize, page * pageSize);
};
