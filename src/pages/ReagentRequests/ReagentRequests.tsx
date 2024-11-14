import { Box, Button, Container, Pagination, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AddReagentRequest,
  DashboardBreadcrumbs,
  OrderFromRequest,
  PageError,
  PageLoader,
  ReagentRequestTable,
  StatusFilter,
} from "@/components";
import { userRoles } from "@/constants";
import {
  Severity,
  useAlertSnackbar,
  useAppSelector,
  useCheckedRows,
} from "@/hooks";
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

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const userId = useAppSelector(selectUserId);
  const role = useAppSelector(selectUserRole);

  const { showSuccess, showError } = useAlertSnackbar();

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

  const {
    selected,
    selectedRows,
    isSelected,
    handleSelectAllClick,
    handleCheckboxClick,
    setSelected,
  } = useCheckedRows(visibleItems);

  if (isOfficerRequestsLoading || isResearcherRequestsLoading)
    return <PageLoader />;
  if (!reagentRequestsOfficer || !reagentRequestsResearcher) {
    return <PageError text={t("requests.errors.emptyError")} />;
  }

  const handleSortChange = (property: RequestsSortColumns) => {
    const isAsc = sortColumn !== property || sortDirection === "desc";
    setSortDirection(isAsc ? "asc" : "desc");
    setSortColumn(property);
  };

  const onAddRequestForm = (severity: Severity) => {
    if (severity === "error")
      showError(t("requests.snackBarMessages.failedAdd"));
    else {
      showSuccess(t("requests.snackBarMessages.added"));
    }
  };

  const handleCreateOrder = () => {
    setIsOrderModalOpen(true);
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
          {role === userRoles.Researcher && (
            <Button onClick={() => setModalOpen(true)}>
              {t("createRequestForm.title")}
            </Button>
          )}
          {role === userRoles.ProcurementOfficer && (
            <Button disabled={!selected.length} onClick={handleCreateOrder}>
              {t("orders.buttons.createOrder")}
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
      {isOrderModalOpen && (
        <OrderFromRequest
          modalOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          requests={selectedRows}
          onCreateOrder={() => setSelected([])}
        />
      )}
      {modalOpen && (
        <AddReagentRequest
          modalOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddRequestForm={onAddRequestForm}
        />
      )}
    </Container>
  );
};

export default ReagentRequests;
