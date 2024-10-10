import { RouteProps } from "react-router-dom";

import { Home, Login, StorageLocationPage } from "@/pages";

export const enum AppRoutes {
  HOME = "home",
  LOGIN = "login",
  STORAGE_LOCATIONS = "storage",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.STORAGE_LOCATIONS]: "/storage",
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
  [AppRoutes.STORAGE_LOCATIONS]: {
    path: RoutePath[AppRoutes.STORAGE_LOCATIONS],
    element: <StorageLocationPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
