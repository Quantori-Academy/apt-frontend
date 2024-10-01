import { RouteProps } from "react-router-dom";

import { Home } from "@/pages";
import { StorageLocationPage } from "@/pages/StorageLocationPage";
import { StorageLocations } from "@/pages/StorageLocations";

export const enum AppRoutes {
  HOME = "home",
  NOT_FOUND = "not_found",
  STORAGE_LOCATIONS = "storage_locations",
  STORAGE_LOCATION_PAGE = "storage_location_page",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.NOT_FOUND]: "*",
  [AppRoutes.STORAGE_LOCATIONS]: "/storage_locations",
  [AppRoutes.STORAGE_LOCATION_PAGE]: "/storage_locations/:id",
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath[AppRoutes.HOME],
    element: <Home />,
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
