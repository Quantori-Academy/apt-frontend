import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ConfirmRemoving } from "@/components";
import { useAlertSnackbar, useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import { selectUserId, useDeleteUserMutation } from "@/store";
import { handleError } from "@/utils";

type DeleteUserProps = {
  userId: string;
};

const DeleteUser: React.FC<DeleteUserProps> = ({ userId }) => {
  const { t } = useTranslation();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const navigate = useNavigate();
  const currentUserId = useAppSelector(selectUserId);

  const { showSuccess, showError } = useAlertSnackbar();

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userId).unwrap();
      showSuccess(t("userDetails.snackBarMessages.delete.success"));
      navigate(RouteProtectedPath.users);
    } catch (error) {
      handleError({ error, t, showError });
    }
  };

  if (currentUserId === userId) {
    return null;
  }

  return (
    <Container>
      <Button
        color="primary"
        fullWidth
        type="button"
        onClick={() => setIsOpenModal(true)}
        disabled={isDeleting}
      >
        {t("userDetails.buttons.deleteUser")}
      </Button>
      <ConfirmRemoving
        open={isOpenModal}
        modalTitle={""}
        modalText={t("userDetails.modalMessages.confirmDelete")}
        onClose={() => setIsOpenModal(false)}
        onDelete={handleDeleteUser}
      />
    </Container>
  );
};

export default DeleteUser;
