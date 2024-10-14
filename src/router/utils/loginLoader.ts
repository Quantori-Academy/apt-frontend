import { redirect } from "react-router-dom";

import { selectUserIsAuthenticated, store } from "@/store";

export const loginLoader = () => {
  const state = store.getState();

  const isAuthenticated = selectUserIsAuthenticated(state);

  if (isAuthenticated) {
    return redirect("/dashboard");
  }

  return null;
};
