import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AlertSnackbar, RevealableField } from "@/components";
import { PASSWORD_REGEX } from "@/constants";
import { useUpdatePasswordMutation } from "@/store";
import { UserBase } from "@/types";

import style from "./ResetPassword.module.css";

type PasswordUpdate = Pick<UserBase, "password">;

type ResetPasswordFields = {
  confirmPassword: string;
  password: string;
};

type ResetPasswordProps = {
  userId: string;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ userId }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

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
    const { error } = await updatePassword({
      userId,
      updatedPassword: updatedPassword.password,
    });

    if (error) {
      setIsAlertOpen(true);
    } else {
      setIsEditMode(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isEditMode ? (
        <Box className={style.inputBox}>
          <RevealableField<ResetPasswordFields>
            name="password"
            label="Password"
            register={register}
            error={errors.password}
            options={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password need to be not less than 8 character",
              },
              pattern: {
                value: PASSWORD_REGEX,
                message: "Password must contain at least one uppercase letter",
              },
            }}
          />
          <RevealableField<ResetPasswordFields>
            name="confirmPassword"
            label="Confirm Password"
            register={register}
            error={errors.confirmPassword}
            options={{
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            }}
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
            disabled={isLoading}
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
          onClick={() => setIsEditMode(true)}
        >
          Reset Password
        </Button>
      )}

      <AlertSnackbar
        severity={"error"}
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      >
        Failed to update password
      </AlertSnackbar>
    </form>
  );
};

export default ResetPassword;
