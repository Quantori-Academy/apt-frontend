import {
  Box,
  Container,
  TablePagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AddReagentModal,
  AddSampleModal,
  CategoryFilter,
  DashboardBreadcrumbs,
  PageError,
  PageLoader,
  SearchBar,
  SubstancesTable,
} from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { selectUserRole, useGetSubstancesQuery } from "@/store";
import {
  CategoryFilterOption,
  ExpiredFilter,
  SortColumn,
  SortDirection,
} from "@/types";
import { getListData } from "@/utils";

import style from "./SubstancesList.module.css";

const SubstancesList: React.FC = () => {
  const { t } = useTranslation();
  const { data: substances = [], isLoading, isError } = useGetSubstancesQuery();

  const [page, setPage] = useState(0);
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterOption>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expiredFilter, setExpiredFilter] = useState<ExpiredFilter>("All");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const role = useAppSelector(selectUserRole);
  const handleSortChange = (property: SortColumn) => {
    const isAsc = sortColumn !== property || sortDirection === "desc";
    setSortDirection(isAsc ? "asc" : "desc");
    setSortColumn(property);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        pageSize: rowsPerPage,
      }),
    [
      categoryFilter,
      substances,
      sortColumn,
      sortDirection,
      page,
      searchQuery,
      expiredFilter,
      rowsPerPage,
    ]
  );

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <PageError text={t("substances.errors.loadError")} />;
  }

  return (
    <Container>
      <DashboardBreadcrumbs />
      <Typography variant="h3" sx={{ marginBottom: "30px" }}>
        {t("substances.title")}
      </Typography>
      {role === userRoles.Researcher && (
        <Box className={style.buttonBox} sx={{ display: "flex", gap: 2 }}>
          <AddReagentModal />
          <AddSampleModal />
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
          <ToggleButton value="All">{t("substances.filters.all")}</ToggleButton>
          <ToggleButton value="Expired">
            {t("substances.filters.expired")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <SubstancesTable
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        visibleItems={visibleItems}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalPages}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, page) => setPage(page)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default SubstancesList;
