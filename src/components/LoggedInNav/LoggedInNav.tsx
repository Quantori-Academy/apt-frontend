import { Avatar, Box, Button, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";

import { userRoles } from "@/constants";
import { useAppDispatch } from "@/hooks";
import { logout } from "@/store";
import { UserRole } from "@/types";

import styles from "./LoggedInNav.module.css";

type LoggedInNavProps = {
  role: UserRole;
};

const LoggedInNav: React.FC<LoggedInNavProps> = ({ role }) => {
  const dispatch = useAppDispatch();

  return (
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {role === userRoles.Administrator && (
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
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </Box>
    </>
  );
};

export default LoggedInNav;
