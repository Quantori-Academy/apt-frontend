import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScienceIcon from "@mui/icons-material/Science";
import { Container, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { DashboardCard } from "@/components/DashboardCard";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";

import style from "./Dashboard.module.css";

const iconStyles = { height: "80px", width: "80px" };

const userCard = (
  <React.Fragment>
    <CardContent>
      <PeopleAltIcon color="secondary" sx={iconStyles} />
      <Typography color="#2c387e" variant="h6">
        Users
      </Typography>
    </CardContent>
  </React.Fragment>
);

const substancesCard = (
  <React.Fragment>
    <CardContent>
      <ScienceIcon color="secondary" sx={iconStyles} />
      <Typography color="#2c387e" variant="h6">
        Substances
      </Typography>
    </CardContent>
  </React.Fragment>
);

const storageCard = (
  <React.Fragment>
    <CardContent>
      <Inventory2Icon color="secondary" sx={iconStyles} />
      <Typography color="#2c387e" variant="h6">
        Storage
      </Typography>
    </CardContent>
  </React.Fragment>
);

const Dashboard = () => {
  const role = useAppSelector(selectUserRole);

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" gutterBottom>
        Dashboard
      </Typography>

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        {role === userRoles.Administrator && (
          <NavLink to="/users" className={style.navLink}>
            <DashboardCard dashboardCard={userCard} />
          </NavLink>
        )}
        {role === userRoles.Researcher && (
          <NavLink to="/substances" className={style.navLink}>
            {" "}
            <DashboardCard dashboardCard={substancesCard} />
          </NavLink>
        )}
        {(role === userRoles.Administrator ||
          role === userRoles.Researcher) && (
          <NavLink to="/storages" className={style.navLink}>
            <DashboardCard dashboardCard={storageCard} />
          </NavLink>
        )}
      </Container>
    </Container>
  );
};
export default Dashboard;
