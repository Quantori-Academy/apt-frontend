import { RouteObject } from "react-router-dom";

import { Home, Login } from "@/pages";
import { StorageLocationDetailPage } from "@/pages/StorageLocationDetail";
import { StorageLocationPage } from "@/pages/StorageLocations";

import { loginLoader } from "./utils/loginLoader";

export const enum AppPublicRoutes {
  HOME = "home",
  LOGIN = "login",
  STORAGE_LOCATIONS = "storage",
  STORAGE_LOCATION_DETAIL = "storage_detail",
  NOT_FOUND = "not_found",
}

export const RoutePublicPath: Record<AppPublicRoutes, string> = {
  [AppPublicRoutes.HOME]: "/",
  [AppPublicRoutes.LOGIN]: "/login",
  [AppPublicRoutes.STORAGE_LOCATIONS]: "/storage",
  [AppPublicRoutes.STORAGE_LOCATION_DETAIL]: "/storage/:locationId",

  [AppPublicRoutes.NOT_FOUND]: "*",
};

export const publicRoutesRouterConfig: Record<AppPublicRoutes, RouteObject> = {
  [AppPublicRoutes.HOME]: {
    path: RoutePublicPath[AppPublicRoutes.HOME],
    element: <Home />,
  },
  [AppPublicRoutes.LOGIN]: {
    path: RoutePublicPath[AppPublicRoutes.LOGIN],
    element: <Login />,
    loader: loginLoader,
  },
  [AppPublicRoutes.STORAGE_LOCATIONS]: {
    path: RoutePublicPath[AppPublicRoutes.STORAGE_LOCATIONS],
    element: <StorageLocationPage />,
  },
  [AppPublicRoutes.STORAGE_LOCATION_DETAIL]: {
    path: RoutePublicPath[AppPublicRoutes.STORAGE_LOCATION_DETAIL],
    element: <StorageLocationDetailPage />,
  },
  [AppPublicRoutes.NOT_FOUND]: {
    path: RoutePublicPath[AppPublicRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
