import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import { AlertSnackbar, Header } from "@/components";
import { useAppSelector } from "@/hooks";
import { selectUserIsAuthenticated } from "@/store";

const authStyles = {
  padding: "105px 30px 30px 30px",
  width: "100%",
  height: "100%",
};

const unAuthStyles = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const AppLayout = () => {
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  return (
    <>
      <Header />
      <Container sx={isAuthenticated ? authStyles : unAuthStyles}>
        <Outlet />
        <AlertSnackbar />
      </Container>
    </>
  );
};

export default AppLayout;
