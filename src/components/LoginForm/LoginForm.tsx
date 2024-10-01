import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

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
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Username"
        name="username"
        type="text"
        variant="outlined"
        value={userData.username}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        value={userData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
