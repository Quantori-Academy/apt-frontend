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
  SearchBar,
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
  const [modalOpen, setModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<RequestsSortColumns>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const userId = useAppSelector(selectUserId);
  const role = useAppSelector(selectUserRole);

  const { showSuccess, showError } = useAlertSnackbar();

  const { t } = useTranslation();
  const shouldLoadOwnRequests = role === userRoles.Researcher;

  const {
    data: reagentRequestsOfficer = [],
    isLoading: isOfficerRequestsLoading,
  } = useGetAllReagentRequestsQuery(undefined, {
    skip: shouldLoadOwnRequests,
  });

  const {
    data: reagentRequestsResearcher = [],
    isLoading: isResearcherRequestsLoading,
  } = useGetOwnReagentRequestsQuery(userId!, {
    skip: !shouldLoadOwnRequests,
  });

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
        searchQuery: searchQuery.toLowerCase(),
      }),
    [
      role,
      reagentRequestsOfficer,
      sortColumn,
      sortDirection,
      page,
      statusFilter,
      reagentRequestsResearcher,
      searchQuery,
    ]
  );
  const pendingItems = visibleItems.filter((item) => item.status === "Pending");

  const {
    selected,
    selectedRows,
    isSelected,
    handleSelectAllClick,
    toggleCheckbox,
    setSelected,
  } = useCheckedRows(pendingItems);

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <StatusFilter
          filter={statusFilter}
          setFilter={setStatusFilter}
          setPage={setPage}
        />
        <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <Box sx={{ display: "flex", height: "60px" }}>
          {role === userRoles.Researcher && (
            <Button onClick={() => setModalOpen(true)}>
              {t("createRequestForm.buttonText")}
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
        visibleItems={visibleItems}
        selected={selected}
        onSortChange={handleSortChange}
        isSelected={isSelected}
        handleSelectAllClick={handleSelectAllClick}
        toggleCheckbox={toggleCheckbox}
        pendingItems={pendingItems}
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
          requests={selectedRows}
          onClose={() => setIsOrderModalOpen(false)}
          onCreateOrder={() => setSelected(new Set())}
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
