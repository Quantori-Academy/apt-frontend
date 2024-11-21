import Card from "@mui/material/Card";
import { ReactElement } from "react";

type DashboardCardProps = {
  dashboardCard: ReactElement;
  bgColor: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  dashboardCard,
  bgColor,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: "none",
        width: 250,
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      {dashboardCard}
    </Card>
  );
};

export default DashboardCard;
