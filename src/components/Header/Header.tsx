import { AppBar, Container, Toolbar } from "@mui/material";

import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";

import { LoggedInNav } from "../LoggedInNav";
import { LoggedOutNav } from "../LoggedOutNav";

const Header: React.FC = () => {
  const role = useAppSelector(selectUserRole);

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
          {!role ? <LoggedOutNav /> : <LoggedInNav role={role} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
