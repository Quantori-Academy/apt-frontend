import { RouteProps } from "react-router-dom";

import { AccountSettings, Home, Login, UserList } from "@/pages";

export const enum AppRoutes {
  HOME = "home",
  LOGIN = "login",
  NOT_FOUND = "not_found",
  USERS = "users",
  ACCOUNT_SETTINGS = "account-settings",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.USERS]: "/users",
  [AppRoutes.ACCOUNT_SETTINGS]: "/account-settings",
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
  [AppRoutes.USERS]: {
    path: RoutePath[AppRoutes.USERS],
    element: <UserList />,
  },
  [AppRoutes.ACCOUNT_SETTINGS]: {
    path: RoutePath[AppRoutes.ACCOUNT_SETTINGS],
    element: <AccountSettings />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
