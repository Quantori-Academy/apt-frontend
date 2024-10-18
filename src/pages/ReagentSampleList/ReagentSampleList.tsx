import { Box, Button, Container, Pagination, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { PageLoader, ReagentSampleTable, SearchBar } from "@/components";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FilterOption } from "@/components/CategoryFilter/CategoryFilter.tsx";
import { PageError } from "@/components/PageError";
import { useGetReagentSampleListQuery } from "@/store";
import { SortColumn, SortDirection } from "@/types";
import { PAGE_SIZE, getListData } from "@/utils";

import style from "./ReagentSampleList.module.css";

const ReagentSampleList: React.FC = () => {
  const {
    data: reagents = [],
    isLoading,
    isError,
  } = useGetReagentSampleListQuery();

  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filter, setFilter] = useState<FilterOption>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortChange = (property: SortColumn) => {
    const isAsc = sortColumn !== property || sortDirection === "desc";
    setSortDirection(isAsc ? "asc" : "desc");
    setSortColumn(property);
  };

  const { visibleItems, filteredItemsCount, searchResultCount } = useMemo(
    () =>
      getListData(
        reagents,
        filter,
        sortColumn,
        sortDirection,
        page,
        searchQuery
      ),
    [filter, reagents, sortColumn, sortDirection, page, searchQuery]
  );

  const totalPages = searchResultCount
    ? Math.ceil(searchResultCount / PAGE_SIZE)
    : Math.ceil(filteredItemsCount / PAGE_SIZE);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <PageError pageName="Reagents and Samples" />;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Reagents And Samples
      </Typography>
      <Box className={style.buttonBox}>
        <Button variant="contained" color="primary">
          Add Reagent
        </Button>
        <Button variant="contained" color="primary">
          Add Sample
        </Button>
      </Box>
      <Box display="flex" gap={2} marginBottom={2}>
        <CategoryFilter
          filter={filter}
          setFilter={setFilter}
          setPage={setPage}
        />
        <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      </Box>
      <ReagentSampleTable
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        visibleItems={visibleItems}
      />
      <Box className={style.pagination}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </Box>
    </Container>
  );
};

export default ReagentSampleList;
