import { RouteProps } from "react-router-dom";

import { AccountSettings, Users } from "@/pages";
import { UserRole } from "@/types";

type AppRoutesProps = RouteProps & {
  roles?: UserRole[];
};
export const enum AppProtectedRoutes {
  USERS = "users",
  USER_PAGE = "user_page",
  ACCOUNT_SETTINGS = "account_settings",
}

export const RouteProtectedPath: Record<AppProtectedRoutes, string> = {
  [AppProtectedRoutes.USERS]: "/users",
  [AppProtectedRoutes.USER_PAGE]: "/users/:id",
  [AppProtectedRoutes.ACCOUNT_SETTINGS]: "/account-settings",
};

export const protectedRoutesRouterConfig: Record<
  AppProtectedRoutes,
  AppRoutesProps
> = {
  [AppProtectedRoutes.USERS]: {
    path: RouteProtectedPath[AppProtectedRoutes.USERS],
    element: <Users />,
    roles: ["Administrator"],
  },
  [AppProtectedRoutes.USER_PAGE]: {
    path: RouteProtectedPath[AppProtectedRoutes.USER_PAGE],
    element: <AccountSettings />,
    roles: ["Administrator"],
  },
  [AppProtectedRoutes.ACCOUNT_SETTINGS]: {
    path: RouteProtectedPath[AppProtectedRoutes.ACCOUNT_SETTINGS],
    element: <AccountSettings />,
    roles: ["Administrator", "Procurement Officer", "Researcher"],
  },
};
