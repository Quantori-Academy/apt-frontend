import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { PASSWORD_REGEX, userRoles } from "@/constants";
import { Severity } from "@/hooks";
import { useAddUserMutation } from "@/store";
import { UserRegisterData, UserRegisterInput } from "@/types";

import style from "./AddUserForm.module.css";

type AddUserFormProps = {
  onFormSubmit: (status: Severity) => void;
};

const roles = Object.values(userRoles);

const AddUserForm: React.FC<AddUserFormProps> = ({ onFormSubmit }) => {
  const { t } = useTranslation();

  const [addUser, { isLoading }] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserRegisterInput>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: userRoles.Administrator,
    },
  });

  const onSubmit = async (newUserFormData: UserRegisterInput) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = newUserFormData;
    const dataToSend: UserRegisterData = rest;

    const { error } = await addUser(dataToSend);
    onFormSubmit(error ? "error" : "success");
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <Stack spacing={2} width={300}>
          <TextField
            label={t("addUserForm.requiredFields.username.label")}
            {...register("username", {
              required: t(
                "addUserForm.requiredFields.username.requiredMessage"
              ),
            })}
            helperText={errors.username?.message}
            error={!!errors.username}
          />
          <TextField
            id="firstName"
            label={t("addUserForm.requiredFields.firstName.label")}
            {...register("firstName", {
              required: t(
                "addUserForm.requiredFields.firstName.requiredMessage"
              ),
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label={t("addUserForm.requiredFields.lastName.label")}
            {...register("lastName", {
              required: t(
                "addUserForm.requiredFields.lastName.requiredMessage"
              ),
            })}
            helperText={errors.lastName?.message}
            error={!!errors.lastName}
          />
          <TextField
            type="email"
            label={t("addUserForm.requiredFields.email.label")}
            {...register("email", {
              required: t("addUserForm.requiredFields.email.requiredMessage"),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t("addUserForm.requiredFields.email.patternMessage"),
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label={t("addUserForm.requiredFields.password.label")}
            type="password"
            {...register("password", {
              required: t(
                "addUserForm.requiredFields.password.requiredMessage"
              ),
              minLength: {
                value: 8,
                message: t(
                  "addUserForm.requiredFields.password.minLengthMessage"
                ),
              },
              pattern: {
                value: PASSWORD_REGEX,
                message: t(
                  "addUserForm.requiredFields.password.patternMessage"
                ),
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label={t("addUserForm.requiredFields.confirmPassword.label")}
            type="password"
            {...register("confirmPassword", {
              required: t(
                "addUserForm.requiredFields.confirmPassword.requiredMessage"
              ),
              validate: (value) =>
                value === getValues().password ||
                t("addUserForm.requiredFields.confirmPassword.matchMessage"),
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <TextField
            select
            label={t("addUserForm.requiredFields.role.label")}
            defaultValue={userRoles.Administrator}
            {...register("role", {
              required: t("addUserForm.requiredFields.role.requiredMessage"),
            })}
          >
            {roles.map((option) => (
              <MenuItem key={option} value={option}>
                {t(`users.roles.${option}`)}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" disabled={isLoading}>
            {t("addUserForm.buttons.createUser")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddUserForm;
