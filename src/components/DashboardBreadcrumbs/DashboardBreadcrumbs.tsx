import { NavigateNext } from "@mui/icons-material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import * as React from "react";
import { Link } from "react-router-dom";

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
      <Link color="inherit" to="/dashboard">
        Dashboard
      </Link>

      {route === "users" && (
        <Link color="inherit" to="/users">
          Users
        </Link>
      )}
      {route === "storages" && (
        <Link color="inherit" to="/storage">
          Storage
        </Link>
      )}
      {route === "substances" && (
        <Link color="inherit" to="/substances">
          Substances
        </Link>
      )}
    </Breadcrumbs>
  );
};

export default DashboardBreadcrumbs;
