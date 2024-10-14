import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PageLoader } from "@/components";

import { ProtectedRoute } from "./ProtectedRoute";
import { protectedRoutesRouterConfig } from "./protectedRoutesRouterConfig";
import { publicRoutesRouterConfig } from "./publicRoutesRouterConfig";

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(publicRoutesRouterConfig).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {Object.values(protectedRoutesRouterConfig).map(
          ({ path, element, roles }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute element={element} roles={roles} />}
            />
          )
        )}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
