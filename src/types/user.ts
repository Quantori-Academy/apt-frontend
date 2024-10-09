import { userRoles } from "@/constants";

export type AuthUser = {
  id: string;
  role: UserRole;
};

export type UserInputData = {
  username: string;
  password: string;
  confirmPassword?: string;
  email?: string;
};

export type UserTableColumn = {
  label: string;
  key: string;
};

//I'll rename it later
export type UserDetails = {
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
  users: UserDetails[];
};

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
