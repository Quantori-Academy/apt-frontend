import { RouteProps } from "react-router-dom";

import { Home, Login, UserPage, Users } from "@/pages";

export const enum AppRoutes {
  HOME = "home",
  LOGIN = "login",
  USERS = "users",
  USER_PAGE = "user_page",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.USERS]: "/users",
  [AppRoutes.USER_PAGE]: "users/:id",
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
    element: <Users />,
  },
  [AppRoutes.USER_PAGE]: {
    path: RoutePath[AppRoutes.USER_PAGE],
    element: <UserPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>,
  },
};
