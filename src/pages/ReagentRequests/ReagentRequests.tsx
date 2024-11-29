import { Box, Button, Container, Typography } from "@mui/material";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
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

const ReagentRequests: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState<RequestsSortColumns>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");

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
        pageSize: rowsPerPage,
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
      rowsPerPage,
    ]
  );

  useEffect(() => {
    setPage(0);
  }, [searchQuery, statusFilter]);

  const pendingItems = visibleItems.filter((item) => item.status === "Pending");

  const {
    selected,
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

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(selected);
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
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        onChangePageSize={handleChangeRowsPerPage}
      />
      {isOrderModalOpen && (
        <OrderFromRequest
          modalOpen={isOrderModalOpen}
          requests={selected}
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
