import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PageLoader, ProtectedRoute } from "@/components";

import { routerConfig } from "./routerConfig";

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routerConfig).map(({ path, element, roles }) => {
          const routeElement = roles ? (
            <ProtectedRoute element={element} roles={roles} />
          ) : (
            element
          );
          return <Route key={path} path={path} element={routeElement} />;
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
