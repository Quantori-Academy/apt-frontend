import { redirect } from "react-router-dom";

import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { selectUserIsAuthenticated, store } from "@/store";

export const loginLoader = () => {
  const state = store.getState();

  const isAuthenticated = selectUserIsAuthenticated(state);

  if (isAuthenticated) {
    return redirect(RouteProtectedPath.dashboard);
  }

  return null;
};
