export type User = {
  id: string;
  role: string;
};

export type UserInputData = {
  username: string;
  password: string;
  email?: string;
  confirmPassword?: string;
};

export type UserInputErrors = {
  requiredUsernameError: boolean;
  requiredPasswordError: boolean;
};
