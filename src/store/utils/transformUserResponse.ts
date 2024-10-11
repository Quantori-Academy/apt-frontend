import { UserBackendDetails, UserFrontendDetails } from "@/types";

export const transformUserResponse = (user: UserBackendDetails): UserFrontendDetails => ({
  id: user.id,
  username: user.username,
  email: user.email,
  firstName: user.first_name,
  lastName: user.last_name,
  role: user.role,
  createdAt: user.created_at,
  lastLogin: user.last_login,
});
