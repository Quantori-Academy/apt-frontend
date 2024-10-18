import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { RevealableField } from "@/components";
import { PASSWORD_REGEX } from "@/constants";
import { useAlertSnackbar } from "@/hooks";
import { useResetPasswordMutation } from "@/store";

import style from "./ResetPassword.module.css";

type ResetPasswordFields = {
  confirmPassword: string;
  password: string;
};

type ResetPasswordProps = {
  userId: string;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ userId }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFields>({
    values: {
      password: "",
      confirmPassword: "",
    },
  });
  const { openSnackbar, SnackbarComponent } = useAlertSnackbar({
    isOpen: false,
    severity: "success",
    text: "",
  });

  const onSubmit = async (formData: ResetPasswordFields) => {
    const { error } = await resetPassword({
      userId,
      newPassword: formData.password,
    });

    if (error) {
      openSnackbar("error", "Failed to change password");
    } else {
      openSnackbar("success", "Password changed successfully");
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isEditMode ? (
          <Box className={style.inputBox}>
            <RevealableField
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
                  message:
                    "Password must contain at least one uppercase letter",
                },
              }}
            />
            <RevealableField
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
              onClick={handleCancel}
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
      </form>
      {SnackbarComponent()}
    </Container>
  );
};

export default ResetPassword;
