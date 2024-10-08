import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { AlertSnackbar } from "@/components";
import { useUpdatePasswordMutation } from "@/store/api.ts";

import style from "./ResetPassword.module.css";

type PasswordUpdate = {
  password: string;
};
type ResetPasswordProps = {
  userId: string | undefined;
};
const ResetPassword: React.FC<ResetPasswordProps> = ({ userId }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [updatePassword, { isError }] = useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    values: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (updatedPassword: PasswordUpdate) => {
    updatePassword({
      userId,
      updatedPassword: updatedPassword.password,
    });
    if (!isError) {
      setIsEditMode(false);
    } else {
      console.error("Failed to update password:");
    }
  };

  const handleEditToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.inputContainer}>
      <Grid gap={2}>
        {isEditMode ? (
          <Box className={style.inputBox}>
            <TextField
              label="Password"
              fullWidth
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password need to be not less than 8 character",
                },
                pattern: {
                  value: /^(?=.*[A-Z]).*$/,
                  message:
                    "Password must contain at least one uppercase letter",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirm Password"
              fullWidth
              type="password"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </Box>
        ) : null}
        {isEditMode ? (
          <Box className={style.buttonBox}>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEditToggle}
          >
            Reset Password
          </Button>
        )}
      </Grid>

      <AlertSnackbar
        severity={"error"}
        open={isError}
        onClose={() => setIsEditMode(false)}
      >
        {"Failed to update password"}
      </AlertSnackbar>
    </form>
  );
};

export default ResetPassword;
