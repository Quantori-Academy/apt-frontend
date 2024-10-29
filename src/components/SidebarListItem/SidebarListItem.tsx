import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import style from "./SidebarListItem.module.css";

type SidebarListItemProps = {
  children: ReactNode;
  listItemText: string;
  to: string;
};
const SidebarListItem: React.FC<SidebarListItemProps> = ({
  children,
  listItemText,
  to,
}) => {
  return (
    <ListItem
      sx={{
        width: "100%",
      }}
    >
      <NavLink to={to} className={style.navLink}>
        <ListItemButton
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {children}
          <ListItemText>{listItemText} </ListItemText>
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
};

export default SidebarListItem;
