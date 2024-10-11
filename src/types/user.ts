import { userRoles } from "@/constants";

export type UserBase = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  password: string;
};

export type UserAuth = Pick<UserBase, "id" | "role" | "username">;

export type UserLoginInput = Pick<UserBase, "username" | "password">;

export type UserRegisterInput = Omit<UserBase, "id"> & { confirmPassword: string };

export type UserBackendDetails = Omit<UserBase, "firstName" | "lastName" | "password"> & {
  first_name: string;
  last_name: string;
  created_at: string;
  last_login: string;
};

export type UserFrontendDetails = Omit<UserBase, "password"> & {
  createdAt: string;
  lastLogin: string;
};

export type UserRole = (typeof userRoles)[keyof typeof userRoles];

export type UserRegisterData = Omit<UserRegisterInput, "confirmPassword">;
