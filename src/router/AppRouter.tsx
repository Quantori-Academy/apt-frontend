import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PageLoader } from "@/components";

import { routerConfig } from "./routerConfig";

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routerConfig).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
