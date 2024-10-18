import { AppBar, Container, Toolbar } from "@mui/material";

import { useAppSelector } from "@/hooks";
import { selectUserIsAuthenticated } from "@/store";

import { NavigationAuth } from "../NavigationAuth";
import { NavigationUnauth } from "../NavigationUnauth";

const Header: React.FC = () => {
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  return (
    <AppBar position="sticky" color="inherit" sx={{ height: "75px" }}>
      <Container sx={{ height: "100%" }}>
        <Toolbar
          sx={{
            height: "100%",
            justifyContent: isAuthenticated ? "" : "flex-end",
            alignItems: "center",
          }}
          variant="dense"
        >
          {isAuthenticated ? <NavigationAuth /> : <NavigationUnauth />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
