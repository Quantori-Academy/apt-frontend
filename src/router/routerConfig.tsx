import { RouteProps } from "react-router-dom";

import { AccountDetails } from "@/components/AccountDetails";
import { Home, Login, UserList } from "@/pages";

export const enum AppRoutes {
  HOME = "home",
  LOGIN = "login",
  NOT_FOUND = "not_found",
  USERS = "users",
  ACCOUNT_DETAILS = "account-details",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.USERS]: "/users",
  [AppRoutes.ACCOUNT_DETAILS]: "/accountDetails",
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
  [AppRoutes.ACCOUNT_DETAILS]: {
    path: RoutePath[AppRoutes.ACCOUNT_DETAILS],
    element: <AccountDetails />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
