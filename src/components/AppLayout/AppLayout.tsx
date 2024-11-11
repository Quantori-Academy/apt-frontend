import { Box, Container } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@/components";
import AccountMenu from "@/components/AccountMenu/AccountMenu.tsx";
import { useAppSelector } from "@/hooks";
import { selectUserIsAuthenticated } from "@/store";

const AppLayout = () => {
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header onOpenMenu={handleClick} />
        <Container
          sx={{
            height: "100%",
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
    <Box>
      <Header onOpenMenu={handleClick} />
      <AccountMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      />

      <Container
        sx={{
          marginTop: "75px",
          padding: "30px",
          width: "100%",
          height: "100%",
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default AppLayout;
