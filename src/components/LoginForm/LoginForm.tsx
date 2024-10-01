import { Login } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

import styles from "./loginForm.module.css";

interface IUserData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
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
        <Button
          type="submit"
          variant="outlined"
          size="small"
          sx={{ width: "auto", alignSelf: "center" }}
        >
          Login
          <Login />
        </Button>
      </Box>
    </div>
  );
};

export default LoginForm;
