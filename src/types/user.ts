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
