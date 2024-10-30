import { Box, Button, Container, Pagination, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";

import {
  AddReagentRequest,
  BasicModal,
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
import { getRequestsListData } from "@/utils";

import style from "./ReagentRequests.module.css";

const PAGE_SIZE = 4;

const ReagentRequests: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<RequestsSortColumns>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");
  const [modalOpen, setModalOpen] = useState(false);

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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <StatusFilter
          filter={statusFilter}
          setFilter={setStatusFilter}
          setPage={setPage}
        />
        <Button onClick={() => setModalOpen(true)}>
          Create Reagent Request
        </Button>
      </Box>

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
      <BasicModal
        title="Create Reagent request"
        closeModal={() => setModalOpen(false)}
        isOpen={modalOpen}
      >
        <AddReagentRequest />
      </BasicModal>
    </Container>
  );
};

export default ReagentRequests;
