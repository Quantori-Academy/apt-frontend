import { Login } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Box, Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { usePasswordVisibility } from "@/hooks";
import { useAppSelector } from "@/hooks";
import { useLoginForm } from "@/hooks";
import { useRoleNavigation } from "@/hooks/useRoleNavigation";
import { selectErrorMessage, selectLoading } from "@/store/slices/authSlice";

import styles from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  const error = useAppSelector(selectErrorMessage);
  const isLoading = useAppSelector(selectLoading);

  const { isPasswordShown, handlePassVisibility, inputRef } =
    usePasswordVisibility();

  const { userData, requiredErrors, handleChange, handleSubmit } =
    useLoginForm();

  const { requiredUsernameError, requiredPasswordError } = requiredErrors;

  useRoleNavigation();

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
        <div className={styles.passwordContainer}>
          <TextField
            error={requiredPasswordError}
            label={`Password${requiredPasswordError ? " required" : ""}`}
            name="password"
            type={isPasswordShown ? "text" : "password"}
            variant="outlined"
            size="small"
            value={userData.password}
            onChange={handleChange}
            inputRef={inputRef}
          />
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handlePassVisibility}
            className={styles.iconButton}
          >
            {isPasswordShown ? (
              <VisibilityOffOutlinedIcon fontSize="small" />
            ) : (
              <RemoveRedEyeOutlinedIcon fontSize="small" />
            )}
          </button>
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
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
