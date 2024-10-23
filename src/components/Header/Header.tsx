import { AppBar, Avatar, Button, IconButton } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { RoutePublicPath } from "@/router/publicRoutesRouterConfig.tsx";
import { selectUserIsAuthenticated } from "@/store";

import { Logo } from "../Logo";

type HeaderProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void | null;
};
const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color={"primary"}
      sx={{
        zIndex: 2,
        paddingX: "24px",
        paddingY: "12px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "5px",
        alignItems: "center",
      }}
    >
      <Logo />
      {isAuthenticated ? (
        <IconButton
          color="inherit"
          sx={{ p: 0, mr: 2 }}
          onClick={(e) => onClick(e)}
        >
          <Avatar sx={{ width: 40, height: 40 }} />
        </IconButton>
      ) : (
        <Button component={NavLink} to={RoutePublicPath.login}>
          Login
        </Button>
      )}
    </AppBar>
  );
};

export default Header;
