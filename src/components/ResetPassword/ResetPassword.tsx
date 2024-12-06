import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { RevealableField } from "@/components";
import { PASSWORD_REGEX } from "@/constants";
import { useAlertSnackbar } from "@/hooks";
import { useResetPasswordMutation } from "@/store";
import { handleError } from "@/utils";

import style from "./ResetPassword.module.css";

type ResetPasswordFields = {
  confirmPassword: string;
  password: string;
  currentPassword: string;
};

type ResetPasswordProps = {
  userId: string;
  isAccountPassword: boolean;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({
  userId,
  isAccountPassword,
}) => {
  const { t } = useTranslation();

  const [isEditMode, setIsEditMode] = useState(false);

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

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
      currentPassword: "",
    },
  });

  const { showSuccess, showError } = useAlertSnackbar();

  const onSubmit = async (formData: ResetPasswordFields) => {
    try {
      await resetPassword({
        userId,
        currentPassword: formData.currentPassword,
        newPassword: formData.password,
      }).unwrap();
      showSuccess(t("userDetails.snackBarMessages.password.success"));
      setIsEditMode(false);
    } catch (error) {
      handleError({ error, t, showError });
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
            {isAccountPassword && (
              <RevealableField
                name="currentPassword"
                label={t("userDetails.requiredFields.currentPassword.label")}
                register={register}
                errorMessage={
                  error
                    ? t(
                        "userDetails.requiredFields.currentPassword.incorrectPasswordMessage"
                      )
                    : ""
                }
                error={errors.currentPassword}
                options={{
                  required: t(
                    "userDetails.requiredFields.currentPassword.requiredMessage"
                  ),
                }}
              />
            )}
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
    </Container>
  );
};

export default ResetPassword;
