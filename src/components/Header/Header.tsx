import { AppBar, Container, Toolbar } from "@mui/material";

import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";

import { LoggedInNav } from "../LoggedInNav";
import { LoginButton } from "../LoginButton";

const Header: React.FC = () => {
  const role = useAppSelector(selectUserRole);

  return (
    <AppBar position="sticky" sx={{ height: "75px" }}>
      <Container sx={{ height: "100%" }}>
        <Toolbar
          sx={{
            height: "100%",
            justifyContent: !role ? "flex-end" : "",
            alignItems: "center",
          }}
          variant="dense"
        >
          {role ? <LoggedInNav role={role} /> : <LoginButton />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
