import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AppRoutes } from "@/router";
import { useAddUserMutation } from "@/store";

type FormValues = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

// TODO: consider moving to constants
const roles = ["Admin", "Procurement Officer", "Researcher"];

const AddUser: React.FC = () => {
  const [addUser, { isLoading }] = useAddUserMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: roles[0],
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await addUser(data).unwrap();
      // TODO: show success toast
      navigate(AppRoutes.USERS);
    } catch (error) {
      // TODO: show error toast
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography>Add New User</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={300}>
          <TextField
            label="Username"
            {...register("username", {
              required: "Username is required",
            })}
            helperText={errors.username?.message}
            error={!!errors.username}
          />
          <TextField
            id="firstName"
            label="First Name"
            {...register("firstName", {
              required: "First Name is required",
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            {...register("lastName", {
              required: "Last Name is required",
            })}
            helperText={errors.lastName?.message}
            error={!!errors.lastName}
          />
          <TextField
            type="email"
            label="E-mail"
            {...register("email", {
              required: "e-mail is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password need to be not less than 8 character",
              },
              pattern: {
                value: /^(?=.*[A-Z]).*$/,
                message: "Password must contain at least one uppercase letter",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <TextField
            select
            label="Select Role"
            defaultValue={roles[0]}
            {...register("role", { required: "Please select a role" })}
          >
            {roles.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" disabled={isLoading}>
            Create User
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddUser;
