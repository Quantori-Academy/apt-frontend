import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScienceIcon from "@mui/icons-material/Science";
import { Box, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { NavLink } from "react-router-dom";

import { DashboardCard } from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig.tsx";
import { selectUserRole } from "@/store";

import style from "./Dashboard.module.css";

const iconStyles = { height: "80px", width: "80px" };

const userCard = (
  <CardContent sx={{ textAlign: "center" }}>
    <PeopleAltIcon sx={{ ...iconStyles, color: "#ef9a9a" }} />
    <Typography color="#2c387e" variant="h6">
      Users
    </Typography>
  </CardContent>
);

const substancesCard = (
  <CardContent sx={{ textAlign: "center" }}>
    <ScienceIcon color="secondary" sx={{ ...iconStyles, color: "#9fa8da" }} />
    <Typography color="#2c387e" variant="h6">
      Substances
    </Typography>
  </CardContent>
);

const storageCard = (
  <CardContent sx={{ textAlign: "center" }}>
    <Inventory2Icon color="secondary" sx={iconStyles} />
    <Typography color="#2c387e" variant="h6">
      Storage
    </Typography>
  </CardContent>
);

const Dashboard = () => {
  const role = useAppSelector(selectUserRole);

  return (
    <Box maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        {role === userRoles.Administrator && (
          <NavLink to={RouteProtectedPath.users} className={style.navLink}>
            <DashboardCard dashboardCard={userCard} bgColor="#ffebee" />
          </NavLink>
        )}
        {(role === userRoles.Administrator ||
          role === userRoles.Researcher) && (
          <NavLink to={RouteProtectedPath.substances} className={style.navLink}>
            {" "}
            <DashboardCard dashboardCard={substancesCard} bgColor="#e8eaf6" />
          </NavLink>
        )}
        {(role === userRoles.Administrator ||
          role === userRoles.Researcher) && (
          <NavLink
            to={RouteProtectedPath.storageLocation}
            className={style.navLink}
          >
            <DashboardCard dashboardCard={storageCard} bgColor="#e0f2f1" />
          </NavLink>
        )}
      </Box>
    </Box>
  );
};
export default Dashboard;
