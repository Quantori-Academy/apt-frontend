import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AlertSnackbar, RevealableField } from "@/components";
import { PASSWORD_REGEX } from "@/constants";
import { useGetUserDetailsQuery, useResetPasswordMutation } from "@/store";

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
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState<"success" | "error">(
    "success"
  );
  const { isError } = useGetUserDetailsQuery(userId);
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

  const onSubmit = async (formData: ResetPasswordFields) => {
    const { error } = await resetPassword({
      userId,
      newPassword: formData.password,
    });

    setIsAlertOpen(true);
    if (error) {
      setIsErrorAlert("error");
    } else {
      setIsErrorAlert("success");
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    reset();
  };
  if (isError) return null;
  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", marginBottom: "25px" }}
        variant="h5"
        gutterBottom
        margin={3}
      >
        Account Details
      </Typography>
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
            Change Password
          </Button>
        )}
      </form>
      <AlertSnackbar
        severity={isErrorAlert}
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      >
        {isErrorAlert === "error"
          ? "Fail to update user details"
          : "Updated successfully"}
      </AlertSnackbar>
    </Container>
  );
};

export default ResetPassword;
