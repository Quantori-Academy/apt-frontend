import { Avatar, Box, Button, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { userRoles } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import { logout, selectUserRole } from "@/store";

import styles from "./NavigationAuth.module.css";

const NavigationAuth: React.FC = () => {
  const { t } = useTranslation();
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
          {t("header.dashboard")}
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
        {role !== userRoles.ProcurementOfficer && (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
            to={RouteProtectedPath.substances}
          >
            {t("header.substances")}
          </NavLink>
        )}
        {role !== userRoles.ProcurementOfficer && (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
            to={RouteProtectedPath.storageLocation}
          >
            {t("header.storage")}
          </NavLink>
        )}

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeNavLink}`
              : styles.navLink
          }
          to={RouteProtectedPath.reagentRequests}
        >
          Reagent Requests
        </NavLink>
      </Box>
      <Button onClick={() => dispatch(logout())}>
        {t("header.button.logout")}
      </Button>
    </>
  );
};

export default NavigationAuth;
