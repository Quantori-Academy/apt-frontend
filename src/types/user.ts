import { userRoles } from "@/constants";

export type User = {
  id: string;
  role: string;
};

export type UserInputData = {
  username: string;
  password: string;
  confirmPassword?: string;
  email?: string;
};

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
