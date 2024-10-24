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
import { useNavigate } from "react-router-dom";

import { PageLoader, SearchBar, SubstancesTable } from "@/components";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PageError } from "@/components/PageError";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig.tsx";
import { selectUserRole } from "@/store";
import { useGetSubstancesQuery } from "@/store";
import {
  CategoryFilterOption,
  ExpiredFilter,
  SortColumn,
  SortDirection,
} from "@/types";
import { getListData } from "@/utils";

import style from "./SubstancesList.module.css";

const PAGE_SIZE = 5;

const SubstancesList: React.FC = () => {
  const { data: substances = [], isLoading, isError } = useGetSubstancesQuery();

  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterOption>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expiredFilter, setExpiredFilter] = useState<ExpiredFilter>("All");
  const navigate = useNavigate();

  const role = useAppSelector(selectUserRole);
  const handleSortChange = (property: SortColumn) => {
    const isAsc = sortColumn !== property || sortDirection === "desc";
    setSortDirection(isAsc ? "asc" : "desc");
    setSortColumn(property);
  };

  const { visibleItems, totalPages } = useMemo(
    () =>
      getListData({
        items: substances,
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
      substances,
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
      <Typography variant="h4" sx={{ mb: 2 }}>
        Reagents And Samples
      </Typography>
      {role === userRoles.Researcher && (
        <Box className={style.buttonBox}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(RouteProtectedPath.reagentAddPage)}
          >
            Add Reagent
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(RouteProtectedPath.sampleAddPage)}
          >
            Add Sample
          </Button>
        </Box>
      )}
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
      <SubstancesTable
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

export default SubstancesList;
