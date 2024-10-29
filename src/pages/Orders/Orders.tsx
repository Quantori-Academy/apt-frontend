import { Container, Typography } from "@mui/material";

import { OrdersTable } from "@/components";

const Orders = () => {
  return (
    <Container>
      <Typography sx={{ marginBottom: "20px" }} variant="h2">
        Orders
      </Typography>
      <OrdersTable />
    </Container>
  );
};

export default Orders;
