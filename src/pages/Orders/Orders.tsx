import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";

import { OrdersFilter, OrdersTable, SearchBar } from "@/components";
import { StatusFilter } from "@/types";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [page, setPage] = useState(0);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: "30px",
        }}
      >
        <Typography variant="h3">Orders</Typography>
        <Button variant="outlined">Add Order</Button>
      </Box>
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
        setPage={setPage}
      />
    </Container>
  );
};

export default Orders;
