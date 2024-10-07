import { userRoles } from "@/constants";

export type User = {
  id: string;
  role: string;
};

export type UserInputData = {
  username: string;
  password: string;
};

export type UserInputErrors = {
  requiredUsernameError: boolean;
  requiredPasswordError: boolean;
};

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
