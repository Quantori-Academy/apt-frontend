import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import {
  AppPublicRoutes,
  RoutePublicPath,
} from "@/router/publicRoutesRouterConfig";

const NavigationUnauth: React.FC = () => (
  <Button component={NavLink} to={RoutePublicPath[AppPublicRoutes.LOGIN]}>
    Login
  </Button>
);

export default NavigationUnauth;
