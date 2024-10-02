import { Login } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Box, Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

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

interface IErrors {
  requiredUsernameError: boolean;
  requiredPasswordError: boolean;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectLoading);

  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
  });

  const [requiredErrors, setRequiredErros] = useState<IErrors>({
    requiredUsernameError: false,
    requiredPasswordError: false,
  });
  const { requiredUsernameError, requiredPasswordError } = requiredErrors;

  const [showPass, setShowPass] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const handlePassVisibility = () => {
    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart;
      setShowPass((prev) => !prev);
      setTimeout(() => {
        if (inputRef.current) {
          // Restore the cursor position after the re-render
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setRequiredErros({
      requiredUsernameError: false,
      requiredPasswordError: false,
    });
    let hasError: boolean = false;
    if (!userData.username) {
      setRequiredErros((prev) => ({ ...prev, requiredUsernameError: true }));
      hasError = true;
    }
    if (!userData.password) {
      setRequiredErros((prev) => ({ ...prev, requiredPasswordError: true }));
      hasError = true;
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
        <div className={styles.passContainer}>
          <TextField
            error={requiredPasswordError}
            label={`Password${requiredPasswordError ? " required" : ""}`}
            name="password"
            type={showPass ? "text" : "password"}
            variant="outlined"
            size="small"
            value={userData.password}
            onChange={handleChange}
            inputRef={inputRef}
          />
          <button
            type="button"
            // onMouseDown={(e) => e.preventDefault()}
            onClick={handlePassVisibility}
            className={styles.iconButton}
          >
            {showPass ? (
              <VisibilityOffOutlinedIcon fontSize="small" />
            ) : (
              <RemoveRedEyeOutlinedIcon fontSize="small" />
            )}
          </button>
        </div>
        {error && <span className={styles.errorMessage}>Failed to fetch</span>}
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
      </Box>
    </div>
  );
};

export default LoginForm;
