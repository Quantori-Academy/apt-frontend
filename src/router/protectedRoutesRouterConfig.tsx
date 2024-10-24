import { RouteObject } from "react-router-dom";

import { userRoles } from "@/constants";
import {
  AccountSettings,
  Dashboard,
  ReagentPage,
  SamplePage,
  StorageLocationDetailPage,
  StorageLocationPage,
  SubstancesList,
  UserDetails,
  Users,
} from "@/pages";
import { AddReagentPage } from "@/pages/AddReagentPage";
import { AddSamplePage } from "@/pages/AddSamplePage";
import { UserRole } from "@/types";

type AppRoutesProps = RouteObject & {
  roles?: UserRole[];
};

export const enum AppProtectedRoutes {
  USERS = "users",
  USER_PAGE = "userPage",
  ACCOUNT_SETTINGS = "accountSettings",
  DASHBOARD = "dashboard",
  SUBSTANCES = "substances",
  REAGENT_PAGE = "reagentPage",
  SAMPLE_PAGE = "samplePage",
  SAMPLE_ADD_PAGE = "sampleAddPage",
  REAGENT_ADD_PAGE = "reagentAddPage",
  STORAGE_LOCATIONS = "storage",
  STORAGE_LOCATION_DETAIL = "storageDetail",
}

export const RouteProtectedPath: Record<AppProtectedRoutes, string> = {
  [AppProtectedRoutes.USERS]: "/users",
  [AppProtectedRoutes.USER_PAGE]: "/users/:id",
  [AppProtectedRoutes.ACCOUNT_SETTINGS]: "/account-settings",
  [AppProtectedRoutes.STORAGE_LOCATIONS]: "/storage",
  [AppProtectedRoutes.STORAGE_LOCATION_DETAIL]: "/storage/:locationId",
  [AppProtectedRoutes.DASHBOARD]: "/dashboard",
  [AppProtectedRoutes.SUBSTANCES]: "/substances",
  [AppProtectedRoutes.REAGENT_PAGE]: "/substances/reagent/:id",
  [AppProtectedRoutes.SAMPLE_PAGE]: "/substances/sample/:id",
  [AppProtectedRoutes.SAMPLE_ADD_PAGE]: "/substances/add-sample",
  [AppProtectedRoutes.REAGENT_ADD_PAGE]: "/reagent-sample-list/add-reagent",
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
  [AppProtectedRoutes.SUBSTANCES]: {
    path: RouteProtectedPath[AppProtectedRoutes.SUBSTANCES],
    element: <SubstancesList />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.REAGENT_PAGE]: {
    path: RouteProtectedPath[AppProtectedRoutes.REAGENT_PAGE],
    element: <ReagentPage />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.SAMPLE_PAGE]: {
    path: RouteProtectedPath[AppProtectedRoutes.SAMPLE_PAGE],
    element: <SamplePage />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.DASHBOARD]: {
    path: RouteProtectedPath[AppProtectedRoutes.DASHBOARD],
    element: <Dashboard />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.SAMPLE_ADD_PAGE]: {
    path: RouteProtectedPath[AppProtectedRoutes.SAMPLE_ADD_PAGE],
    element: <AddSamplePage />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.REAGENT_ADD_PAGE]: {
    path: RouteProtectedPath[AppProtectedRoutes.REAGENT_ADD_PAGE],
    element: <AddReagentPage />,
    roles: Object.values(userRoles),
  },
};
