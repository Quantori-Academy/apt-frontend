import { Login } from "@mui/icons-material";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "15px",
        maxWidth: 300,
        width: "100%",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        sx={{ width: "100%" }}
        error={requiredUsernameError}
        label="Username"
        name="username"
        type="text"
        variant="outlined"
        size="small"
        value={userData.username}
        helperText={requiredUsernameError ? "Username is required" : ""}
        onChange={handleChange}
      />
      <PasswordField
        value={userData.password}
        onChange={handleChange}
        error={requiredPasswordError}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
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
            <Typography variant="body1" component="span">
              Login
            </Typography>{" "}
            <Login />
          </Button>
        )}
      </div>
    </Box>
  );
};

export default LoginForm;
