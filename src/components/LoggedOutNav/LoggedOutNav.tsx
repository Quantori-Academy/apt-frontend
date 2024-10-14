import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const LoggedOutNav: React.FC = () => (
  <Button component={NavLink} to="/login">
    Login
  </Button>
);

export default LoggedOutNav;
