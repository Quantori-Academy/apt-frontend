import { Navigate, RouteObject } from "react-router-dom";

import { Login } from "@/pages";

import { loginLoader } from "./utils/loginLoader";

export const enum AppPublicRoutes {
  ROOT_REDIRECT = "root_redirect",
  LOGIN = "login",
  NOT_FOUND = "not_found",
}

export const RoutePublicPath: Record<AppPublicRoutes, string> = {
  [AppPublicRoutes.ROOT_REDIRECT]: "/",
  [AppPublicRoutes.LOGIN]: "/login",
  [AppPublicRoutes.NOT_FOUND]: "*",
};

export const publicRoutesRouterConfig: Record<AppPublicRoutes, RouteObject> = {
  [AppPublicRoutes.ROOT_REDIRECT]: {
    path: RoutePublicPath[AppPublicRoutes.ROOT_REDIRECT],
    element: <Navigate to="/dashboard" />,
  },
  [AppPublicRoutes.LOGIN]: {
    path: RoutePublicPath[AppPublicRoutes.LOGIN],
    element: <Login />,
    loader: loginLoader,
  },
  [AppPublicRoutes.NOT_FOUND]: {
    path: RoutePublicPath[AppPublicRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
