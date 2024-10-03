import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { selectUserRole } from "@/store/slices/authSlice";

import { useAppSelector } from "./useAppSelector";

export const useRoleNavigation = () => {
  const userRole = useAppSelector(selectUserRole);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole) {
      switch (userRole) {
        case "admin": {
          navigate("/admin");
          break;
        }
        case "officer": {
          navigate("/officer");
          break;
        }
        case "researcher": {
          navigate("/researcher");
          break;
        }
        default: {
          console.warn("Unknown user role:", userRole);
        }
      }
    }
  }, [userRole, navigate]);
};
