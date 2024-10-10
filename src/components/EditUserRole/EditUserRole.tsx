import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { AlertSnackbar, LoadingSkeleton } from "@/components";
import { userRoles } from "@/constants";
import { useGetUserDetailsQuery, useUpdateRoleMutation } from "@/store";
import { selectUserRole } from "@/store/slices/authSlice.ts";
import { UserRole } from "@/types";

import style from "@/components/ResetPassword/ResetPassword.module.css";

type EditUserRoleProps = {
  userId: string;
};

type UserRoleUpdate = {
  role?: UserRole;
};

const EditUserRole: React.FC<EditUserRoleProps> = ({ userId }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const userRole = useSelector(selectUserRole);

  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserDetailsQuery(userId);

  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateRoleMutation();

  const { register, handleSubmit } = useForm<UserRoleUpdate>({
    values: {
      role: userDetails?.role,
    },
  });

  if (isLoadingUserDetails) return <LoadingSkeleton />;

  const onSubmit = async ({ role: updatedRole }: UserRoleUpdate) => {
    const { error } = await updateRole({
      userId,
      updatedRole,
    });

    if (error) {
      setIsAlertOpen(true);
    } else {
      setIsEditMode(false);
    }
  };

  return (
    <Container>
      {userRole !== "Administrator" ? (
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            User Role:
          </Typography>
          <Typography>{userDetails?.role}</Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {isEditMode ? (
            <TextField
              label="User Roles"
              fullWidth
              select
              defaultValue={userRoles.Admin}
              {...register("role", { required: "Please select a role" })}
            >
              {Object.entries(userRoles).map(([roleValue, role]) => (
                <MenuItem key={roleValue} value={roleValue}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <Box className="roleBox" margin={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                User Role:
              </Typography>
              <Typography>{userDetails?.role}</Typography>
            </Box>
          )}
          {isEditMode ? (
            <Box className={style.buttonBox}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                color="primary"
                type="submit"
                disabled={isUpdatingRole}
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
              Edit Role
            </Button>
          )}

          <AlertSnackbar
            severity={"error"}
            open={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
          >
            Failed To Update Role
          </AlertSnackbar>
        </form>
      )}
    </Container>
  );
};

export default EditUserRole;
