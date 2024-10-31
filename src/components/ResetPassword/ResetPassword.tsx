import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  const onSubmit = async (formData: ResetPasswordFields) => {
    const { error } = await resetPassword({
      userId,
      newPassword: formData.password,
    });

    if (error) {
      openSnackbar("error", t("userDetails.snackBarMessages.password.error"));
    } else {
      openSnackbar(
        "success",
        t("userDetails.snackBarMessages.password.success")
      );
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
              label={t("userDetails.requiredFields.password.label")}
              register={register}
              error={errors.password}
              options={{
                required: t(
                  "userDetails.requiredFields.password.requiredMessage"
                ),
                minLength: {
                  value: 8,
                  message: t(
                    "userDetails.requiredFields.password.minLengthMessage"
                  ),
                },
                pattern: {
                  value: PASSWORD_REGEX,
                  message: t(
                    "userDetails.requiredFields.password.patternMessage"
                  ),
                },
              }}
            />
            <RevealableField
              name="confirmPassword"
              label={t("userDetails.requiredFields.confirmPassword.label")}
              register={register}
              error={errors.confirmPassword}
              options={{
                required: t(
                  "userDetails.requiredFields.confirmPassword.requiredMessage"
                ),
                validate: (value) =>
                  value === getValues().password ||
                  t("userDetails.requiredFields.confirmPassword.matchMessage"),
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
              {t("buttons.save")}
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCancel}
            >
              {t("buttons.cancel")}
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setIsEditMode(true)}
          >
            {t("userDetails.buttons.changePassword")}
          </Button>
        )}
      </form>
      {SnackbarComponent()}
    </Container>
  );
};

export default ResetPassword;
