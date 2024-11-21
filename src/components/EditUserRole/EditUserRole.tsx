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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

  const { showSuccess, showError } = useAlertSnackbar();

  if (isLoadingUserDetails) return <PageLoader />;

  const onSubmit = async ({ role: updatedRole }: UserRoleUpdate) => {
    const { error } = await updateRole({
      userId,
      updatedRole,
    });

    if (error) {
      showError(t("userDetails.snackBarMessages.role.error"));
    } else {
      showSuccess(t("userDetails.snackBarMessages.role.success"));
      setIsEditMode(false);
    }
  };

  return (
    <Container>
      {userId === currentUserId ? (
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("users.table.role")}
          </Typography>
          <Typography>{t(`users.roles.${userDetails?.role}`)}</Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {isEditMode ? (
            <TextField
              label={t("users.table.role")}
              fullWidth
              select
              defaultValue={userRoles.Administrator}
              {...register("role", { required: "Please select a role" })}
            >
              {Object.values(userRoles).map((role) => (
                <MenuItem key={role} value={role}>
                  {t(`users.roles.${role}`)}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <Box className="roleBox" margin={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {t("users.table.role")}
              </Typography>
              <Typography>{t(`users.roles.${userDetails?.role}`)}</Typography>
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
              onClick={() => setIsEditMode(true)}
            >
              {t("userDetails.buttons.editRole")}
            </Button>
          )}
        </form>
      )}
    </Container>
  );
};

export default EditUserRole;
