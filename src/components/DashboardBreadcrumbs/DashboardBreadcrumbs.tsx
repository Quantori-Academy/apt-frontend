import { NavigateNext } from "@mui/icons-material";
import { Link } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

type DashboardBreadcrumbsProps = {
  route: "users" | "substances" | "storages" | null;
};
const DashboardBreadcrumbs: React.FC<DashboardBreadcrumbsProps> = ({
  route,
}) => {
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link component={RouterLink} to="/dashboard">
        Dashboard
      </Link>

      {route === "users" && (
        <Link component={RouterLink} color="inherit" to="/users">
          Users
        </Link>
      )}
      {route === "storages" && (
        <Link component={RouterLink} color="inherit" to="/storage">
          Storage
        </Link>
      )}
      {route === "substances" && (
        <Link component={RouterLink} color="inherit" to="/substances">
          Substances
        </Link>
      )}
    </Breadcrumbs>
  );
};

export default DashboardBreadcrumbs;
