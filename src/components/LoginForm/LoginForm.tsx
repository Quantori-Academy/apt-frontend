import { Login } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ChangeEvent, FormEvent, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  loginUser,
  selectError,
  selectLoading,
} from "@/store/slices/authSlice";

import styles from "./loginForm.module.css";

interface IUserData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectLoading);
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
  });

  const [requiredUsernameError, setRequiredUsernameError] =
    useState<boolean>(false);
  const [requiredPasswordError, setRequiredPasswordError] =
    useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setRequiredUsernameError(false);
    setRequiredPasswordError(false);
    let hasError: boolean = false;
    if (!userData.username) {
      setRequiredUsernameError(true);
      hasError = true;
    }
    if (!userData.password) {
      setRequiredPasswordError(true);
      hasError = true;
    }
    if (hasError) {
      return;
    }
    console.log(userData);
    dispatch(loginUser(userData));
  };
  return (
    <div className={styles.container}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={styles.boxContainer}
      >
        <TextField
          error={requiredUsernameError}
          label={`Username${requiredUsernameError ? " required" : ""}`}
          name="username"
          type="text"
          variant="outlined"
          size="small"
          value={userData.username}
          onChange={handleChange}
        />
        <TextField
          error={requiredPasswordError}
          label={`Password${requiredPasswordError ? " required" : ""}`}
          name="password"
          type="password"
          variant="outlined"
          size="small"
          value={userData.password}
          onChange={handleChange}
        />

        <div className={styles.buttonContainer}>
          {isLoading ? (
            <div>
              <CircularProgress size="35px" />
            </div>
          ) : (
            <Button
              type="submit"
              variant="outlined"
              size="small"
              sx={{ display: "flex", gap: "3px" }}
            >
              <span>Login</span> <Login />
            </Button>
          )}
        </div>

        <div>{error}</div>
      </Box>
    </div>
  );
};

export default LoginForm;
