import { Login } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppSelector } from "@/hooks";
import { useLoginForm } from "@/hooks";
import { useRoleNavigation } from "@/hooks/useRoleNavigation";
import { selectErrorMessage, selectLoading } from "@/store/slices/authSlice";

import { PasswordField } from "../PasswordField";

import styles from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  const error = useAppSelector(selectErrorMessage);
  const isLoading = useAppSelector(selectLoading);

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
        <PasswordField
          value={userData.password}
          onChange={handleChange}
          error={requiredPasswordError}
        />
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
