import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScienceIcon from "@mui/icons-material/Science";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { Box, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { DashboardCard } from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import { selectUserRole } from "@/store";

import style from "./Dashboard.module.css";

const iconStyles = { height: "80px", width: "80px" };

const Dashboard = () => {
  const { t } = useTranslation();

  const role = useAppSelector(selectUserRole);

  const userCard = (
    <CardContent sx={{ textAlign: "center" }}>
      <PeopleAltIcon sx={{ ...iconStyles, color: "#ef9a9a" }} />
      <Typography color="#2c387e" variant="h6">
        {t("users.title")}
      </Typography>
    </CardContent>
  );

  const substancesCard = (
    <CardContent sx={{ textAlign: "center" }}>
      <ScienceIcon color="secondary" sx={{ ...iconStyles, color: "#9fa8da" }} />
      <Typography color="#2c387e" variant="h6">
        {t("substances.title")}
      </Typography>
    </CardContent>
  );

  const storageCard = (
    <CardContent sx={{ textAlign: "center" }}>
      <Inventory2Icon color="secondary" sx={iconStyles} />
      <Typography color="#2c387e" variant="h6">
        {t("storage.title.dashboardStorage")}
      </Typography>
    </CardContent>
  );

  const reagentRequestCard = (
    <CardContent sx={{ textAlign: "center" }}>
      <WorkHistoryIcon sx={{ ...iconStyles, color: "#8d6e63" }} />
      <Typography color="#2c387e" variant="h6">
        {t("requests.title")}
      </Typography>
    </CardContent>
  );
  const ordersCard = (
    <CardContent sx={{ textAlign: "center" }}>
      <StorefrontIcon sx={{ ...iconStyles, color: "#90a4ae" }} />
      <Typography color="#2c387e" variant="h6">
        {t("orders.title.OrdersPage")}
      </Typography>
    </CardContent>
  );

  return (
    <Box maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        {t("header.dashboard")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginTop: 4,
          transition: "box-shadow 0.3s ease-in-out",
        }}
      >
        {role === userRoles.Administrator && (
          <NavLink to={RouteProtectedPath.users} className={style.navLink}>
            <DashboardCard dashboardCard={userCard} bgColor="#ffebee" />
          </NavLink>
        )}

        <NavLink to={RouteProtectedPath.substances} className={style.navLink}>
          <DashboardCard dashboardCard={substancesCard} bgColor="#e8eaf6" />
        </NavLink>

        <NavLink
          to={RouteProtectedPath.storageLocation}
          className={style.navLink}
        >
          <DashboardCard dashboardCard={storageCard} bgColor="#e0f2f1" />
        </NavLink>

        {role !== userRoles.Administrator && (
          <NavLink
            to={RouteProtectedPath.reagentRequests}
            className={style.navLink}
          >
            <DashboardCard
              dashboardCard={reagentRequestCard}
              bgColor="#efebe9"
            />
          </NavLink>
        )}
        {role === userRoles.ProcurementOfficer && (
          <NavLink to={RouteProtectedPath.orders} className={style.navLink}>
            <DashboardCard dashboardCard={ordersCard} bgColor="#eceff1" />
          </NavLink>
        )}
      </Box>
    </Box>
  );
};
export default Dashboard;
