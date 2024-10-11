import { RouteProps } from "react-router-dom";

import { AccountSettings, Home, Login, Users } from "@/pages";
import { UserRole } from "@/types";

export const enum AppRoutes {
  HOME = "home",
  LOGIN = "login",
  USERS = "users",
  USER_PAGE = "user_page",
  ACCOUNT_SETTINGS = "account_settings",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.USERS]: "/users",
  [AppRoutes.USER_PAGE]: "/users/:id",
  [AppRoutes.ACCOUNT_SETTINGS]: "/account-settings",
  [AppRoutes.NOT_FOUND]: "*",
};

type AppRoutesProps = RouteProps & {
  roles?: UserRole[];
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath[AppRoutes.HOME],
    element: <Home />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath[AppRoutes.LOGIN],
    element: <Login />,
  },
  [AppRoutes.USERS]: {
    path: RoutePath[AppRoutes.USERS],
    element: <Users />,
    roles: ["Administrator"],
  },
  [AppRoutes.USER_PAGE]: {
    path: RoutePath[AppRoutes.USER_PAGE],
    element: <AccountSettings />,
    roles: ["Administrator"],
  },
  [AppRoutes.ACCOUNT_SETTINGS]: {
    path: RoutePath[AppRoutes.ACCOUNT_SETTINGS],
    element: <AccountSettings />,
    roles: ["Administrator", "Procurement Officer", "Researcher"],
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
