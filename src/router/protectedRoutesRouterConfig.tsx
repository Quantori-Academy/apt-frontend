import { RouteObject } from "react-router-dom";

import { userRoles } from "@/constants";
import {
  AccountSettings,
  Dashboard,
  ReagentPage,
  ReagentSampleList,
  UserDetails,
  Users,
} from "@/pages";
import { UserRole } from "@/types";

type AppRoutesProps = RouteObject & {
  roles?: UserRole[];
};

export const enum AppProtectedRoutes {
  USERS = "users",
  USER_PAGE = "userPage",
  ACCOUNT_SETTINGS = "accountSettings",
  DASHBOARD = "dashboard",
  REAGENT_SAMPLE_LIST = "reagentSampleList",
  REAGENT_PAGE = "reagentPage",
}

export const RouteProtectedPath: Record<AppProtectedRoutes, string> = {
  [AppProtectedRoutes.USERS]: "/users",
  [AppProtectedRoutes.USER_PAGE]: "/users/:id",
  [AppProtectedRoutes.ACCOUNT_SETTINGS]: "/account-settings",
  [AppProtectedRoutes.DASHBOARD]: "/dashboard",
  [AppProtectedRoutes.REAGENT_SAMPLE_LIST]: "/reagent-sample-list",
  [AppProtectedRoutes.REAGENT_PAGE]: "/reagent-sample-list/reagent/:id",
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
    element: <UserDetails />,
    roles: [userRoles.Administrator],
  },
  [AppProtectedRoutes.ACCOUNT_SETTINGS]: {
    path: RouteProtectedPath[AppProtectedRoutes.ACCOUNT_SETTINGS],
    element: <AccountSettings />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.REAGENT_SAMPLE_LIST]: {
    path: RouteProtectedPath[AppProtectedRoutes.REAGENT_SAMPLE_LIST],
    element: <ReagentSampleList />,
    roles: [userRoles.Administrator, userRoles.Researcher],
  },
  [AppProtectedRoutes.REAGENT_PAGE]: {
    path: RouteProtectedPath[AppProtectedRoutes.REAGENT_PAGE],
    element: <ReagentPage />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.DASHBOARD]: {
    path: RouteProtectedPath[AppProtectedRoutes.DASHBOARD],
    element: <Dashboard />,
    roles: Object.values(userRoles),
  },
};
