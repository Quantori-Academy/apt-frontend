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

import { PageLoader } from "@/components";
import { userRoles } from "@/constants";
import { useAlertSnackbar, useAppSelector } from "@/hooks";
import {
  selectUserId,
  useGetUserDetailsQuery,
  useUpdateRoleMutation,
} from "@/store";
import { UserRole } from "@/types";

type EditUserRoleProps = {
  userId: string;
};

type UserRoleUpdate = {
  role?: UserRole;
};

const EditUserRole: React.FC<EditUserRoleProps> = ({ userId }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const currentUserId = useAppSelector(selectUserId);
  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserDetailsQuery(userId);

  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateRoleMutation();

  const { register, handleSubmit } = useForm<UserRoleUpdate>({
    values: {
      role: userDetails?.role,
    },
  });

  const { openSnackbar, SnackbarComponent } = useAlertSnackbar({
    isOpen: false,
    severity: "success",
    text: "",
  });

  if (isLoadingUserDetails) return <PageLoader />;

  const onSubmit = async ({ role: updatedRole }: UserRoleUpdate) => {
    const { error } = await updateRole({
      userId,
      updatedRole,
    });

    if (error) {
      openSnackbar("error", "Failed to change role!");
    } else {
      openSnackbar("success", "Role has changed successfully!");
      setIsEditMode(false);
    }
  };

  return (
    <Container>
      {userId === currentUserId ? (
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
              defaultValue={userRoles.Administrator}
              {...register("role", { required: "Please select a role" })}
            >
              {Object.values(userRoles).map((role) => (
                <MenuItem key={role} value={role}>
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
            <Box display="flex" gap={2} marginTop={2}>
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
        </form>
      )}

      {SnackbarComponent()}
    </Container>
  );
};

export default EditUserRole;
