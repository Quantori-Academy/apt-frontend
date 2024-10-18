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

import { AlertSnackbar, LoadingSkeleton } from "@/components";
import { userRoles } from "@/constants";
import { useGetUserDetailsQuery, useUpdateRoleMutation } from "@/store";
import { UserRole } from "@/types";

type EditUserRoleProps = {
  userId: string;
  currentUserId: string;
  currentUserRole: UserRole;
};

type UserRoleUpdate = {
  role?: UserRole;
};

const EditUserRole: React.FC<EditUserRoleProps> = ({
  userId,
  currentUserId,
  currentUserRole,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState<"success" | "error">(
    "success"
  );
  const {
    data: userDetails,
    isLoading: isLoadingUserDetails,
    isError,
  } = useGetUserDetailsQuery(userId);

  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateRoleMutation();

  const { register, handleSubmit } = useForm<UserRoleUpdate>({
    values: {
      role: userDetails?.role,
    },
  });
  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography variant="h2">User not found!</Typography>
      </Box>
    );
  }
  if (isLoadingUserDetails) return <LoadingSkeleton />;

  const onSubmit = async ({ role: updatedRole }: UserRoleUpdate) => {
    const { error } = await updateRole({
      userId,
      updatedRole,
    });

    setIsAlertOpen(true);
    if (error) {
      setIsErrorAlert("error");
    } else {
      setIsErrorAlert("success");
      setIsEditMode(false);
    }
  };

  return (
    <Container>
      {currentUserRole !== "Administrator" || userId === currentUserId ? (
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

export default EditUserRole;
