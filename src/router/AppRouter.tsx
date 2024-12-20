import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AppLayout, PageLoader } from "@/components";

import { ProtectedRoute } from "./ProtectedRoute";
import { protectedRoutesRouterConfig } from "./protectedRoutesRouterConfig";
import { publicRoutesRouterConfig } from "./publicRoutesRouterConfig";

const routes = [
  {
    element: <AppLayout />,
    children: [
      ...Object.values(publicRoutesRouterConfig),

      ...Object.values(protectedRoutesRouterConfig).map(
        ({ path, element, roles }) => ({
          path,
          element: <ProtectedRoute element={element} roles={roles} />,
        })
      ),
    ],
  },
];

const router = createBrowserRouter(routes);

const AppRouter = () => (
  <RouterProvider router={router} fallbackElement={<PageLoader />} />
);

export default AppRouter;
