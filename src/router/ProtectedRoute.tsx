import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";
import { UserRole } from "@/types";

import { RoutePublicPath } from "./publicRoutesRouterConfig";

type ProtectedRouteProps = {
  element: ReactNode;
  roles?: UserRole[];
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  roles = [],
}) => {
  const currentRole = useAppSelector(selectUserRole);

  if (!currentRole) {
    return <Navigate to={RoutePublicPath.login} />;
  }
  if (currentRole && !roles.includes(currentRole)) {
    return <Navigate to="/404" />;
  }
  if (roles.includes(currentRole)) {
    return element;
  }
};
