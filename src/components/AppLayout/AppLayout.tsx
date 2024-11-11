import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Header } from "@/components";
import { useAppSelector } from "@/hooks";
import { selectUserIsAuthenticated } from "@/store";

const AppLayout = () => {
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
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
      <Header />

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
