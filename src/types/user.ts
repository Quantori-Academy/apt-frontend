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

export type UserTableColumn = {
  label: string;
  key: string;
};

// TODO. Think of backend-to-frontend object fields mapper
export type UserBackendDetails = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
  last_login: string;
};

export type UserTableProps = {
  users: UserBackendDetails[];
};

export type UserRole = (typeof userRoles)[keyof typeof userRoles];

export type UserRegisterData = Omit<UserRegisterInput, "confirmPassword">;
