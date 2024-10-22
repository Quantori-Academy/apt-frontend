import { Box, Container, Paper } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@/components";
import AccountMenu from "@/components/AccountMenu/AccountMenu.tsx";
import { useAppSelector } from "@/hooks";
import { selectUserIsAuthenticated } from "@/store";

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
    <Box>
      <Header onClick={handleClick} />
      <AccountMenu anchorEl={anchorEl} open={open} onClose={handleClose} />

      <Container>
        <Paper
          sx={{
            marginTop: "75px",
            padding: "30px",
            width: "100%",
            height: "100%",
          }}
        >
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default AppLayout;
