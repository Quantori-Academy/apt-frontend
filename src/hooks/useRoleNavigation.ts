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
        case "Administrator": {
          navigate("/users");
          break;
        }
        case "Procurement Officer": {
          navigate("/officer");
          break;
        }
        case "Researcher": {
          navigate("/researcher");
          break;
        }
        default: {
          navigate("/");
        }
      }
    }
  }, [userRole, navigate]);
};
