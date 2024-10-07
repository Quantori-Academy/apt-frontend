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

export type UserInputErrors = {
  requiredUsernameError: boolean;
  requiredPasswordError: boolean;
};
