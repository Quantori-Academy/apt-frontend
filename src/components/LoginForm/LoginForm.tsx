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
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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
          label="Username"
          name="username"
          type="text"
          variant="outlined"
          size="small"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          size="small"
          value={userData.password}
          onChange={handleChange}
          required
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
