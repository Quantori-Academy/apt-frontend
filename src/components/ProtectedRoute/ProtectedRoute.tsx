// src/components/ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
  element: ReactNode;
  roles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  roles = [],
}) => {
  const currentRole = useAppSelector(selectUserRole);

  if (!currentRole) {
    return <Navigate to="/login" />;
  }

  if (roles.includes(currentRole)) {
    return element;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
