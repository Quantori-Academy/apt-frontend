import React, { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";
import { UserRole } from "@/types";

type ProtectedRouteProps = {
  element: ReactNode;
  roles?: UserRole[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  roles = [],
}) => {
  const currentRole = useAppSelector(selectUserRole);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentRole && !roles.includes(currentRole)) {
      navigate(-1);
    }
  }, [navigate, currentRole, roles]);

  if (!currentRole) {
    return <Navigate to="/login" />;
  }

  if (roles.includes(currentRole)) {
    return element;
  }

  return null;
};

export default ProtectedRoute;
