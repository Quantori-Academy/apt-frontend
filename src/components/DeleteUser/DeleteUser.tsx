import { Box, Button, Container, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAlertSnackbar, useAppSelector } from "@/hooks";
import { selectUserId, useDeleteUserMutation } from "@/store";

import style from "./DeleteUser.module.css";

type DeleteUserProps = {
  userId: string;
};

const DeleteUser: React.FC<DeleteUserProps> = ({ userId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const navigate = useNavigate();
  const currentUserId = useAppSelector(selectUserId);

  const { openSnackbar, SnackbarComponent } = useAlertSnackbar({
    isOpen: false,
    severity: "success",
    text: "",
  });

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

      <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <Box className={style.modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this user?
          </Typography>
          <Box marginTop={3} display="flex" justifyContent="flex-end" gap={3}>
            <Button
              sx={{
                color: "white",
                bgcolor: "red",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#e30000",
                },
              }}
              variant="contained"
              onClick={handleDeleteUser}
              disabled={isDeleting}
            >
              Delete
            </Button>
            <Button onClick={() => setIsOpenModal(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
      {SnackbarComponent()}
    </Container>
  );
};

export default DeleteUser;
