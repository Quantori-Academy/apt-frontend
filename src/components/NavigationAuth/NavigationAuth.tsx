import { Avatar, Box, Button, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";

import { userRoles } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { logout, selectUserRole } from "@/store";

import styles from "./NavigationAuth.module.css";

const NavigationAuth: React.FC = () => {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectUserRole);
  return (
    <>
      <IconButton
        color="inherit"
        sx={{ p: 0, mr: 2 }}
        component={NavLink}
        to={RouteProtectedPath.accountSettings}
      >
        <Avatar sx={{ width: 50, height: 50 }} />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          gap: "3px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeNavLink}`
              : styles.navLink
          }
          to={RouteProtectedPath.dashboard}
        >
          Dashboard
        </NavLink>
        {role === userRoles.Administrator && (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
            to={RouteProtectedPath.users}
          >
            Users
          </NavLink>
        )}
      </Box>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </>
  );
};

export default NavigationAuth;
