import { RouteObject } from "react-router-dom";

import { userRoles } from "@/constants";
import {
  AccountSettings,
  Dashboard,
  StorageLocationDetailPage,
  StorageLocationPage,
  Users,
} from "@/pages";
import { UserRole } from "@/types";

type AppRoutesProps = RouteObject & {
  roles?: UserRole[];
};

export const enum AppProtectedRoutes {
  USERS = "users",
  USER_PAGE = "user_page",
  ACCOUNT_SETTINGS = "account_settings",
  STORAGE_LOCATIONS = "storage",
  STORAGE_LOCATION_DETAIL = "storage_detail",
  DASHBOARD = "dashboard",
}

export const RouteProtectedPath: Record<AppProtectedRoutes, string> = {
  [AppProtectedRoutes.USERS]: "/users",
  [AppProtectedRoutes.USER_PAGE]: "/users/:id",
  [AppProtectedRoutes.ACCOUNT_SETTINGS]: "/account-settings",
  [AppProtectedRoutes.STORAGE_LOCATIONS]: "/storage",
  [AppProtectedRoutes.STORAGE_LOCATION_DETAIL]: "/storage/:locationId",
  [AppProtectedRoutes.DASHBOARD]: "/dashboard",
};

export const protectedRoutesRouterConfig: Record<
  AppProtectedRoutes,
  AppRoutesProps
> = {
  [AppProtectedRoutes.USERS]: {
    path: RouteProtectedPath[AppProtectedRoutes.USERS],
    element: <Users />,
    roles: [userRoles.Administrator],
  },
  [AppProtectedRoutes.USER_PAGE]: {
    path: RouteProtectedPath[AppProtectedRoutes.USER_PAGE],
    element: <AccountSettings />,
    roles: [userRoles.Administrator],
  },
  [AppProtectedRoutes.STORAGE_LOCATIONS]: {
    path: RouteProtectedPath[AppProtectedRoutes.STORAGE_LOCATIONS],
    element: <StorageLocationPage />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.STORAGE_LOCATION_DETAIL]: {
    path: RouteProtectedPath[AppProtectedRoutes.STORAGE_LOCATION_DETAIL],
    element: <StorageLocationDetailPage />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.ACCOUNT_SETTINGS]: {
    path: RouteProtectedPath[AppProtectedRoutes.ACCOUNT_SETTINGS],
    element: <AccountSettings />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.DASHBOARD]: {
    path: RouteProtectedPath[AppProtectedRoutes.DASHBOARD],
    element: <Dashboard />,
    roles: Object.values(userRoles),
  },
};
