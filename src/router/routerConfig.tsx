import { RouteProps } from "react-router-dom";

import { Home, Login, StorageLocationPage, StorageLocations } from "@/pages";

export const enum AppRoutes {
  HOME = "home",
  LOGIN = "login",
  NOT_FOUND = "not_found",
  STORAGE_LOCATIONS = "storage_locations",
  STORAGE_LOCATION_PAGE = "storage_location_page",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.NOT_FOUND]: "*",
  [AppRoutes.STORAGE_LOCATIONS]: "/storage_locations",
  [AppRoutes.STORAGE_LOCATION_PAGE]: "/storage_locations/:id",
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
    element: <StorageLocations />,
  },
  [AppRoutes.STORAGE_LOCATION_PAGE]: {
    path: RoutePath[AppRoutes.STORAGE_LOCATION_PAGE],
    element: <StorageLocationPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
