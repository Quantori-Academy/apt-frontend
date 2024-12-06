import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { PageLoader } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useGetUserDetailsQuery, useUpdateUserDetailsMutation } from "@/store";
import { UserBase } from "@/types";
import { handleError } from "@/utils";

import style from "./AccountDetails.module.css";

// TODO. Get rid of doubles
type UserDetails = Omit<UserBase, "password" | "id" | "role">;

type AccountDetailsProps = {
  userId: string;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({ userId }) => {
  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserDetailsQuery(userId!);

  const [updateUserDetails, { isLoading: isUpdatingDetails }] =
    useUpdateUserDetailsMutation();

  const { showSuccess, showError } = useAlertSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: userDetails,
  });

  if (isLoadingUserDetails) return <PageLoader />;

  const onSubmit = async (updatedUserDetails: UserDetails) => {
    try {
      await updateUserDetails(updatedUserDetails).unwrap();
      showSuccess(t("userDetails.snackBarMessages.details.success"));
      setIsEditMode(false);
    } catch (error) {
      handleError({ error, t, showError });
    }
  };

  const handleEditToggle: MouseEventHandler = (e) => {
    e.preventDefault();
    setIsEditMode(!isEditMode);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              {t("users.table.username")}:
            </Typography>
            <Typography>{userDetails?.username}</Typography>{" "}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              {t("users.table.firstName")}:
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                {...register("firstName", {
                  required: t("userDetails.requiredFields.firstName"),
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                variant="outlined"
              />
            ) : (
              <Typography>{userDetails?.firstName}</Typography>
            )}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              {t("users.table.lastName")}:
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                {...register("lastName", {
                  required: t("userDetails.requiredFields.lastName"),
                })}
                helperText={errors.lastName?.message}
                error={!!errors.lastName}
                variant="outlined"
              />
            ) : (
              <Typography>{userDetails?.lastName}</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              {t("users.table.email")}:
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                {...register("email", {
                  required: t(
                    "userDetails.requiredFields.email.requiredMessage"
                  ),
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: t(
                      "userDetails.requiredFields.email.patternMessage"
                    ),
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
              />
            ) : (
              <Typography>{userDetails?.email}</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            {isEditMode ? (
              <Box className={style.buttonBox}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isUpdatingDetails}
                >
                  {t("buttons.save")}
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditMode(false)}
                >
                  {t("buttons.cancel")}
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleEditToggle}
              >
                {t("userDetails.buttons.editDetails")}
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
export default AccountDetails;
