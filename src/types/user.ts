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

export type UserAuth = Pick<UserBase, "id" | "role">;

export type UserLoginInput = Pick<UserBase, "username" | "password">;

export type UserRegisterInput = Omit<UserBase, "id"> & { confirmPassword: string };

// TODO. Think of backend-to-frontend object fields mapper
export type UserBackendDetails = Omit<UserBase, "firstName" | "lastName" | "role" | "password"> & {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
  last_login: string;
};

export type UserFrontendDetails = Omit<UserBase, "password" | "id" | "role"> & {
  id: number;
  role: string; // You can also map the `UserRole` enum to strings if needed
  createdAt: string;
  lastLogin: string;
};
export type UserRole = (typeof userRoles)[keyof typeof userRoles];

export type UserRegisterData = Omit<UserRegisterInput, "confirmPassword">;
