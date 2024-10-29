import { Box, Container, Pagination, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";

import {
  PageError,
  PageLoader,
  ReagentRequestTable,
  StatusFilter,
} from "@/components";
import { useGetReagentRequestsQuery } from "@/store";
import {
  RequestsSortColumns,
  SortDirection,
  StatusFilterOption,
} from "@/types";
import { getRequestsListData } from "@/utils/getReagentRequestsData.ts";

import style from "@/components/ReagentRequestTable/ReagentRequestTable.module.css";

const PAGE_SIZE = 4;

const ReagentRequests: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<RequestsSortColumns>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");

  const { data: reagentRequests = [], isLoading } =
    useGetReagentRequestsQuery();

  const { visibleItems, totalPages } = useMemo(
    () =>
      getRequestsListData({
        items: reagentRequests,
        sortColumn,
        sortDirection,
        page,
        pageSize: PAGE_SIZE,
        statusFilter,
      }),
    [reagentRequests, sortColumn, sortDirection, page, statusFilter]
  );

  console.log("am:", visibleItems);
  if (isLoading) return <PageLoader />;
  if (!reagentRequests) {
    return <PageError text="There are no reagent request to show" />;
  }

  const handleSortChange = (property: RequestsSortColumns) => {
    const isAsc = sortColumn !== property || sortDirection === "desc";
    setSortDirection(isAsc ? "asc" : "desc");
    setSortColumn(property);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        height: "100%",
      }}
    >
      <Typography variant="h3">Reagent Requests</Typography>
      <StatusFilter
        filter={statusFilter}
        setFilter={setStatusFilter}
        setPage={setPage}
      />
      <ReagentRequestTable
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

export default ReagentRequests;
