import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import style from "./DeleteUser.module.css";
import { ConfirmRemoving } from "@/components";
import { useAlertSnackbar, useAppSelector } from "@/hooks";
import { selectUserId, useDeleteUserMutation } from "@/store";

type DeleteUserProps = {
  userId: string;
};

const DeleteUser: React.FC<DeleteUserProps> = ({ userId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const navigate = useNavigate();
  const currentUserId = useAppSelector(selectUserId);

  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  const handleDeleteUser = async () => {
    const { error } = await deleteUser(userId);

    if (error) {
      openSnackbar("error", "Failed to delete user!");
    } else {
      openSnackbar("success", "User deleted successfully!");
      navigate("/users");
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
        Delete User
      </Button>
      <ConfirmRemoving
        open={isOpenModal}
        modalTitle={""}
        modalText={"Are you sure you want to delete this user?"}
        onClose={() => setIsOpenModal(false)}
        onDelete={handleDeleteUser}
      />
      {SnackbarComponent()}
    </Container>
  );
};

export default DeleteUser;
