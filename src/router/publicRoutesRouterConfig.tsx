import { RouteProps } from "react-router-dom";

import { Home, Login } from "@/pages";

export const enum AppPublicRoutes {
  HOME = "home",
  LOGIN = "login",
  NOT_FOUND = "not_found",
}

export const RoutePublicPath: Record<AppPublicRoutes, string> = {
  [AppPublicRoutes.HOME]: "/",
  [AppPublicRoutes.LOGIN]: "/login",
  [AppPublicRoutes.NOT_FOUND]: "*",
};

export const publicRoutesRouterConfig: Record<AppPublicRoutes, RouteProps> = {
  [AppPublicRoutes.HOME]: {
    path: RoutePublicPath[AppPublicRoutes.HOME],
    element: <Home />,
  },
  [AppPublicRoutes.LOGIN]: {
    path: RoutePublicPath[AppPublicRoutes.LOGIN],
    element: <Login />,
  },
  [AppPublicRoutes.NOT_FOUND]: {
    path: RoutePublicPath[AppPublicRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
