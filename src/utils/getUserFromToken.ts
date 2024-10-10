import { jwtDecode } from "jwt-decode";

import { UserRole } from "@/types";

type UserTokenDetail = {
  id: string;
  role: UserRole;
  username: string;
};

export function getUserFromToken(): UserTokenDetail | null {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  return jwtDecode(token);
}
