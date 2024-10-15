import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import { RoutePublicPath } from "@/router/publicRoutesRouterConfig";

const NavigationUnauth: React.FC = () => (
  <Button component={NavLink} to={RoutePublicPath.login}>
    Login
  </Button>
);

export default NavigationUnauth;
