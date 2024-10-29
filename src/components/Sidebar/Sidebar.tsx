import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScienceIcon from "@mui/icons-material/Science";
import { Box, List } from "@mui/material";
import * as React from "react";

import { SidebarListItem } from "@/components/SidebarListItem";

import style from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <Box className={style.sidebar}>
      <List sx={{ position: "fixed" }}>
        <SidebarListItem listItemText="Dashboard" to="/dashboard">
          <DashboardIcon color="disabled" />
        </SidebarListItem>
        <SidebarListItem listItemText="Users" to="users">
          <PeopleAltIcon color="disabled" />
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
  );
};

export default Sidebar;
