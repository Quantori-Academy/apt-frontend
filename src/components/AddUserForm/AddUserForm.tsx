import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { userRoles } from "@/constants";
import { useAddUserMutation } from "@/store";
import { UserBase } from "@/types";

import style from "./AddUserForm.module.css";

type CreateUserFormData = Omit<UserBase, "id"> & { confirmPassword: string };

export type AddUserStatus = "error" | "success";

type AddUserFormProps = {
  onFormSubmit: (status: AddUserStatus) => void;
};

const roles = Object.values(userRoles);
const AddUserForm: React.FC<AddUserFormProps> = ({ onFormSubmit }) => {
  const [addUser, { isLoading }] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: userRoles.Admin,
    },
  });

  const onSubmit = async (newUserFormData: CreateUserFormData) => {
    const { error } = await addUser(newUserFormData);
    onFormSubmit(error ? "error" : "success");
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
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
            defaultValue={userRoles.Admin}
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

export default AddUserForm;
