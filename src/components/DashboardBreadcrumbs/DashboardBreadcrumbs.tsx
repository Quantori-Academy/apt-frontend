import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { RouteProtectedPath } from "@/router";

const DashboardBreadcrumbs: React.FC = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const path = location.pathname;

  const breadcrumbsRoutes = {
    [RouteProtectedPath.dashboard]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
    ],
    [RouteProtectedPath.users]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Users", path: RouteProtectedPath.users },
    ],
    [RouteProtectedPath.userPage]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Users", path: RouteProtectedPath.users },
      { label: "User Details", path: RouteProtectedPath.userPage },
    ],
    [RouteProtectedPath.storageLocation]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Storage Locations", path: RouteProtectedPath.storageLocation },
    ],

    [RouteProtectedPath.storageLocationDetail]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Storage Locations", path: RouteProtectedPath.storageLocation },
      {
        label: "Storage Detail",
        path: RouteProtectedPath.storageLocationDetail,
      },
    ],
    [RouteProtectedPath.substances]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Substances", path: RouteProtectedPath.substances },
    ],
    [RouteProtectedPath.reagentPage]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Substances", path: RouteProtectedPath.substances },
      {
        label: "Reagent Detail",
        path: RouteProtectedPath.reagentPage,
      },
    ],
    [RouteProtectedPath.samplePage]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Substances", path: RouteProtectedPath.substances },
      {
        label: "Sample Detail",
        path: RouteProtectedPath.samplePage,
      },
    ],
    [RouteProtectedPath.orders]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Orders", path: RouteProtectedPath.orders },
    ],
    [RouteProtectedPath.orderPage]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Orders", path: RouteProtectedPath.orders },
      { label: "Order Details", path: RouteProtectedPath.orderPage },
    ],
    [RouteProtectedPath.reagentRequests]: [
      { label: "Dashboard", path: RouteProtectedPath.dashboard },
      { label: "Reagent Requests", path: RouteProtectedPath.reagentRequests },
    ],
  };

  const breadcrumbTrail = Object.entries(breadcrumbsRoutes).find(
    ([routePath]) => {
      const regex = new RegExp(`^${routePath.replace(/:\w+/g, "[\\w-]+")}$`);
      return regex.test(path);
    }
  );

  const breadcrumbs = breadcrumbTrail ? breadcrumbTrail[1] : [];

  const processedBreadcrumbs = breadcrumbs.map((breadcrumb) => {
    const dynamicPath = breadcrumb.path.replace(/:\w+/g, (match) => {
      const paramName = match.substring(1);
      const paramValue = path.split("/").pop();
      return paramValue || paramName;
    });

    return { ...breadcrumb, path: dynamicPath };
  });

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ marginBottom: "30px" }}
    >
      {processedBreadcrumbs.map((breadcrumb, index) => (
        <Link key={index} component={RouterLink} to={breadcrumb.path}>
          {t(`breadcrumbs.${breadcrumb.label}`)}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default DashboardBreadcrumbs;
