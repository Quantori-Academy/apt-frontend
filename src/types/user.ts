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

export type UserBase = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
};

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
