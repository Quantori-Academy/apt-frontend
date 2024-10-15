import { redirect } from "react-router-dom";

import { AppProtectedRoutes, RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { selectUserIsAuthenticated, store } from "@/store";

export const loginLoader = () => {
  const state = store.getState();

  const isAuthenticated = selectUserIsAuthenticated(state);

  if (isAuthenticated) {
    return redirect(RouteProtectedPath[AppProtectedRoutes.DASHBOARD]);
  }

  return null;
};
