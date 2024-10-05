import { RouteProps } from "react-router-dom";

import { Home, Login, Users } from "@/pages";

export const enum AppRoutes {
  HOME = "home",
  LOGIN = "login",
  USERS = "users",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.USERS]: "/users",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath[AppRoutes.HOME],
    element: <Home />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath[AppRoutes.LOGIN],
    element: <Login />,
  },
  [AppRoutes.USERS]: {
    path: RoutePath[AppRoutes.USERS],
    element: <Users />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
