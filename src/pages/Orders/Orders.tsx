import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AddOrder,
  DashboardBreadcrumbs,
  EmptyTable,
  OrdersFilter,
  OrdersTable,
  PageError,
  PageLoader,
  SearchBar,
} from "@/components";
import { useGetOrdersQuery } from "@/store";
import { StatusFilter } from "@/types";

const Orders = () => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const [page, setPage] = useState(0);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const {
    data: orders,
    isLoading: isOrdersLoading,
    isError,
  } = useGetOrdersQuery();

  if (isOrdersLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <PageError text={t("orders.errors.loadError")} />;
  }

  const handleStatusChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setPage(0);
  };

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
    setPage(0);
  };

  return (
    <Container>
      <DashboardBreadcrumbs />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: "30px",
        }}
      >
        <Typography variant="h3">{t("orders.title.OrdersPage")}</Typography>
        <Button variant="outlined" onClick={() => setIsOrderModalOpen(true)}>
          {t("orders.buttons.createOrder")}
        </Button>
      </Box>
      {!orders?.length ? (
        <EmptyTable tableName="ordersList" />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              marginBottom: "15px",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1, height: "60px" }}>
              <OrdersFilter
                statusFilter={statusFilter}
                handleStatusChange={handleStatusChange}
              />
            </Box>
            <Box sx={{ flex: 4, height: "60px" }}>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={handleSearchQuery}
              />
            </Box>
          </Box>
          <OrdersTable
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            page={page}
            orders={orders}
            setPage={setPage}
          />
        </>
      )}

      {isOrderModalOpen && (
        <AddOrder
          modalOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default Orders;
