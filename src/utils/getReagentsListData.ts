import { FilterOption } from "@/components/CategoryFilter/CategoryFilter";
import { ReagentDetails, SortColumn, SortDirection } from "@/types";

export const getListData = (
  allItems: Array<ReagentDetails>,
  filter: FilterOption,
  sortColumn: SortColumn,
  sortDirection: SortDirection,
  page: number,
  searchQuery: string,
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

  const paginated = searchResult
    ? searchResult.slice((page - 1) * pageSize, page * pageSize)
    : sorted.slice((page - 1) * pageSize, page * pageSize);

  return {
    visibleItems: paginated,
    filteredItemsCount: filtered.length,
    searchResultCount: searchResult.length,
  };
};
