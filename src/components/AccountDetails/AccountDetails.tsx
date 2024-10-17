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

import { AlertSnackbar, PageLoader } from "@/components";
import { useGetUserDetailsQuery, useUpdateUserDetailsMutation } from "@/store";
import { UserBase } from "@/types";

import style from "./AccountDetails.module.css";

// TODO. Get rid of doubles
type UserDetails = Omit<UserBase, "password" | "id" | "role">;

type AccountDetailsProps = {
  userId: string;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({ userId }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserDetailsQuery(userId!);

  const [updateUserDetails, { isLoading: isUpdatingDetails }] =
    useUpdateUserDetailsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: userDetails,
  });

  if (isLoadingUserDetails) return <PageLoader />;

  const onSubmit = async (updatedUserDetails: UserDetails) => {
    const { error } = await updateUserDetails(updatedUserDetails);

    if (error) {
      setIsAlertOpen(true);
    } else {
      setIsEditMode(false);
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
              Username:
            </Typography>
            <Typography>{userDetails?.username}</Typography>{" "}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              First Name:
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                {...register("firstName", {
                  required: "First Name is required",
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
              Last Name:
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                {...register("lastName", {
                  required: "Last Name is required",
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
              Email:
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                {...register("email", {
                  required: "e-mail is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email",
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
                Edit Details
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      <AlertSnackbar
        severity="error"
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      >
        Fail to update user details
      </AlertSnackbar>
    </Container>
  );
};
export default AccountDetails;
