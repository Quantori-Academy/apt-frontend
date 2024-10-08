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

export type UserTableColumn = {
  label: string;
  key: string;
};

//I'll rename it later
export type TUser = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
};

export type UserTableProps = {
  users: TUser[];
};

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
