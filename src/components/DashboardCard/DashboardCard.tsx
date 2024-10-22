import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import * as React from "react";
import { ReactElement } from "react";

type DashboardCardProps = {
  dashboardCard: ReactElement;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ dashboardCard }) => {
  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          width: 150,
          height: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        {dashboardCard}
      </Card>
    </Box>
  );
};

export default DashboardCard;
