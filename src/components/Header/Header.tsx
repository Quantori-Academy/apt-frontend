import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  const role = useAppSelector(selectUserRole);

  let content: ReactNode = null;

  if (!role) {
    content = (
      <Button component={NavLink} to="/login">
        Login
      </Button>
    );
  } else {
    content = (
      <>
        <IconButton
          color="inherit"
          sx={{ p: 0, mr: 2 }}
          component={NavLink}
          to="/account-settings"
        >
          <Avatar sx={{ width: 50, height: 50 }} />
        </IconButton>
        {/* I'll add role-based navbar object with paths and links in the future */}
        {role === "Administrator" && (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
            to="/users"
          >
            Staff
          </NavLink>
        )}
      </>
    );
  }

  return (
    <AppBar position="static" sx={{ height: "75px" }}>
      <Container sx={{ height: "100%" }}>
        <Toolbar
          sx={{
            height: "100%",
            justifyContent: !role ? "flex-end" : "",
            alignItems: "center",
          }}
          variant="dense"
        >
          {content}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
