import { Box, Button, Container, Pagination, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AddReagentRequest,
  PageError,
  PageLoader,
  ReagentRequestTable,
  StatusFilter,
} from "@/components";
import { DashboardBreadcrumbs } from "@/components/DashboardBreadcrumbs";
import { userRoles } from "@/constants";
import { useAlertSnackbar, useAppSelector, useCheckedRows } from "@/hooks";
import {
  selectUserId,
  selectUserRole,
  useGetAllReagentRequestsQuery,
  useGetOwnReagentRequestsQuery,
} from "@/store";
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

  const userId = useAppSelector(selectUserId);
  const role = useAppSelector(selectUserRole);

  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  const { t } = useTranslation();

  const {
    data: reagentRequestsOfficer = [],
    isLoading: isOfficerRequestsLoading,
  } = useGetAllReagentRequestsQuery();

  const {
    data: reagentRequestsResearcher = [],
    isLoading: isResearcherRequestsLoading,
  } = useGetOwnReagentRequestsQuery(userId!);

  const { visibleItems, totalPages } = useMemo(
    () =>
      getRequestsListData({
        items:
          role !== userRoles.Researcher
            ? reagentRequestsOfficer
            : reagentRequestsResearcher,
        sortColumn,
        sortDirection,
        page,
        pageSize: PAGE_SIZE,
        statusFilter,
      }),
    [
      reagentRequestsOfficer,
      sortColumn,
      sortDirection,
      page,
      statusFilter,
      reagentRequestsResearcher,
    ]
  );

  const { selected, isSelected, handleSelectAllClick, handleCheckboxClick } =
    useCheckedRows(visibleItems);

  if (isOfficerRequestsLoading || isResearcherRequestsLoading)
    return <PageLoader />;
  if (!reagentRequestsOfficer || !reagentRequestsResearcher) {
    return <PageError text="There are no reagent request to show" />;
  }

  const handleSortChange = (property: RequestsSortColumns) => {
    const isAsc = sortColumn !== property || sortDirection === "desc";
    setSortDirection(isAsc ? "asc" : "desc");
    setSortColumn(property);
  };

  const onAddRequestForm = (severity: "error" | "success") => {
    openSnackbar(
      severity,
      severity === "error"
        ? "Failed to add request"
        : "Request Successfully Added"
    );
  };

  const handleCreateOrder = () => {
    //TODO: Implement Create Order
    console.log(selected);
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
      <DashboardBreadcrumbs />
      <Typography variant="h3">{t("requests.title")}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <StatusFilter
          filter={statusFilter}
          setFilter={setStatusFilter}
          setPage={setPage}
        />
        <Box sx={{ display: "flex", gap: "10px" }}>
          {role !== userRoles.Administrator && (
            <Button onClick={() => setModalOpen(true)}>
              {t("createRequestForm.title")}
            </Button>
          )}
          {role === userRoles.ProcurementOfficer && (
            <Button disabled={!selected.length} onClick={handleCreateOrder}>
              Create Order
            </Button>
          )}
        </Box>
      </Box>

      <ReagentRequestTable
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        visibleItems={visibleItems}
        selected={selected}
        isSelected={isSelected}
        handleSelectAllClick={handleSelectAllClick}
        handleCheckboxClick={handleCheckboxClick}
      />
      <Box className={style.pagination}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </Box>
      <AddReagentRequest
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddRequestForm={onAddRequestForm}
      />
      {SnackbarComponent()}
    </Container>
  );
};

export default ReagentRequests;
