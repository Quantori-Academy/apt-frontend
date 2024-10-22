import {
  Box,
  Button,
  Container,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";

import { PageLoader, ReagentSampleTable, SearchBar } from "@/components";
import { CategoryFilter } from "@/components/CategoryFilter";
import { DashboardBreadcrumbs } from "@/components/DashboardBreadcrumbs";
import { PageError } from "@/components/PageError";
import { useGetReagentSampleListQuery } from "@/store";
import {
  CategoryFilterOption,
  ExpiredFilter,
  SortColumn,
  SortDirection,
} from "@/types";
import { getListData } from "@/utils";

import style from "./ReagentSampleList.module.css";

const PAGE_SIZE = 5;

const ReagentSampleList: React.FC = () => {
  const {
    data: reagents = [],
    isLoading,
    isError,
  } = useGetReagentSampleListQuery();

  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterOption>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expiredFilter, setExpiredFilter] = useState<ExpiredFilter>("All");

  const handleSortChange = (property: SortColumn) => {
    const isAsc = sortColumn !== property || sortDirection === "desc";
    setSortDirection(isAsc ? "asc" : "desc");
    setSortColumn(property);
  };

  const { visibleItems, totalPages } = useMemo(
    () =>
      getListData({
        items: reagents,
        categoryFilter,
        sortColumn,
        sortDirection,
        page,
        searchQuery,
        expiredFilter,
        pageSize: PAGE_SIZE,
      }),
    [
      categoryFilter,
      reagents,
      sortColumn,
      sortDirection,
      page,
      searchQuery,
      expiredFilter,
    ]
  );

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <PageError text="Faild to load Reagents and Sample page, Please try later" />
    );
  }

  return (
    <Container>
      <DashboardBreadcrumbs route={"substances"} />
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
          filter={categoryFilter}
          setFilter={setCategoryFilter}
          setPage={setPage}
        />
        <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <ToggleButtonGroup
          color="primary"
          value={expiredFilter}
          exclusive
          onChange={(_event: React.MouseEvent<HTMLElement>, value) =>
            setExpiredFilter(value)
          }
        >
          <ToggleButton value="All">All</ToggleButton>
          <ToggleButton value="Expired">Expired</ToggleButton>
        </ToggleButtonGroup>
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
