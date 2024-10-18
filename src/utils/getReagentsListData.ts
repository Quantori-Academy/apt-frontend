import { FilterOption } from "@/components/CategoryFilter/CategoryFilter";
import { ReagentDetails, SortColumn, SortDirection } from "@/types";

export const PAGE_SIZE = 5;

export const getListData = (
  allItems: Array<ReagentDetails>,
  filter: FilterOption,
  sortColumn: SortColumn,
  sortDirection: SortDirection,
  page: number,
  searchQuery: string
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
    ? searchResult.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    visibleItems: paginated,
    filteredItemsCount: filtered.length,
    searchResultCount: searchResult.length,
  };
};
