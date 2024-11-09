import { RouteObject } from "react-router-dom";

import { userRoles } from "@/constants";
import {
  AccountSettings,
  Dashboard,
  OrderPage,
  Orders,
  ReagentPage,
  ReagentRequests,
  SamplePage,
  StorageLocationDetails,
  StorageLocations,
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
  DASHBOARD = "dashboard",
  USERS = "users",
  USER_PAGE = "userPage",
  ACCOUNT_SETTINGS = "accountSettings",
  SUBSTANCES = "substances",
  REAGENT_PAGE = "reagentPage",
  SAMPLE_ADD_PAGE = "sampleAddPage",
  REAGENT_ADD_PAGE = "reagentAddPage",
  STORAGE_LOCATION_DETAIL = "storageLocationDetail",
  STORAGE_LOCATIONS = "storageLocation",
  SAMPLE_PAGE = "samplePage",
  ORDERS = "orders",
  ORDER_PAGE = "orderPage",
  REAGENT_REQUESTS = "reagentRequests",
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
  [AppProtectedRoutes.ORDERS]: "/orders",
  [AppProtectedRoutes.ORDER_PAGE]: "/orders/:id",
  [AppProtectedRoutes.SAMPLE_ADD_PAGE]: "/substances/add-sample",
  [AppProtectedRoutes.REAGENT_ADD_PAGE]: "/substances/add-reagent",
  [AppProtectedRoutes.REAGENT_REQUESTS]: "/reagent-requests",
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
    element: <StorageLocations />,
    roles: Object.values(userRoles),
  },
  [AppProtectedRoutes.STORAGE_LOCATION_DETAIL]: {
    path: RouteProtectedPath[AppProtectedRoutes.STORAGE_LOCATION_DETAIL],
    element: <StorageLocationDetails />,
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
  [AppProtectedRoutes.ORDERS]: {
    path: RouteProtectedPath[AppProtectedRoutes.ORDERS],
    element: <Orders />,
    roles: [userRoles.ProcurementOfficer],
  },
  [AppProtectedRoutes.ORDER_PAGE]: {
    path: RouteProtectedPath[AppProtectedRoutes.ORDER_PAGE],
    element: <OrderPage />,
    roles: [userRoles.ProcurementOfficer],
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
  [AppProtectedRoutes.REAGENT_REQUESTS]: {
    path: RouteProtectedPath[AppProtectedRoutes.REAGENT_REQUESTS],
    element: <ReagentRequests />,
    roles: Object.values(userRoles),
  },
};
