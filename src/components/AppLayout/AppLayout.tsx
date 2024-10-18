import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ScienceIcon from "@mui/icons-material/Science";
import { Box, Container, List, Paper } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@/components";
import AccountMenu from "@/components/AccountMenu/AccountMenu.tsx";
import { useAppSelector } from "@/hooks";
import { selectUserIsAuthenticated } from "@/store";

import { SidebarListItem } from "../SidebarListItem";

import style from "./AppLayout.module.css";

const AppLayout = () => {
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!isAuthenticated) {
    return (
      <>
        <Header onClick={handleClick} />
        <Container
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Container>
      </>
    );
  }
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "16rem 1fr",
        gridTemplateRows: "auto 1fr",
      }}
    >
      {/* Header */}
      <Header onClick={handleClick} />

      <AccountMenu anchorEl={anchorEl} open={open} onClose={handleClose} />

      {/* Sidebar */}

      <Box className={style.sidebar}>
        <List sx={{ position: "fixed" }}>
          <SidebarListItem listItemText="Dashboard" to="/dashboard">
            <DashboardIcon color="disabled" />
          </SidebarListItem>
          <SidebarListItem listItemText="Users" to="users">
            <PeopleOutlineIcon color="disabled" />
          </SidebarListItem>
          <SidebarListItem listItemText="Storage Location" to="storage">
            <Inventory2Icon color="disabled" />
          </SidebarListItem>
          <SidebarListItem
            listItemText="Reagents and Samples"
            to="reagent-sample-list"
          >
            <ScienceIcon color="disabled" />
          </SidebarListItem>
        </List>
      </Box>
      <Container>
        <Paper
          sx={{
            marginTop: "75px",
            padding: "30px",
            width: "100%",
          }}
        >
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default AppLayout;
