import { RouteProps } from "react-router-dom";

import { AddUserForm, Home, UserList, Login } from "@/pages";

export const enum AppRoutes {
  HOME = "home",
  LOGIN = "login",
  NOT_FOUND = "not_found",
  ADD_USER = "add_user",
  USERS = "users",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.NOT_FOUND]: "*",
  [AppRoutes.USERS]: "/users",
  [AppRoutes.ADD_USER]: "/users/new",
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
  [AppRoutes.ADD_USER]: {
    path: RoutePath[AppRoutes.ADD_USER],
    element: <AddUserForm />,
  },
  [AppRoutes.USERS]: {
    path: RoutePath[AppRoutes.USERS],
    element: <UserList />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
