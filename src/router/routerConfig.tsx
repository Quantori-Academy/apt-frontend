import { RouteProps } from "react-router-dom";

import { Home, Login } from "@/pages";

export const enum AppRoutes {
  HOME = "home",
  LOGIN = "login",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
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
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
