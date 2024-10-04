import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";

import { AddUserForm, AddUserStatus } from "@/components/AddUserForm";
import { AlertSnackbar } from "@/ui/AlertSnackbar";

import style from "./addUserModal.module.css";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  const [status, setStatus] = useState<AddUserStatus>();

  function handleFormSubmit(status: AddUserStatus) {
    setStatus(status);
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New User
          </Typography>
          <AddUserForm onFormSubmit={handleFormSubmit} />
        </Box>
      </Modal>
      <AlertSnackbar open={Boolean(status)} severity={status}>
        {status === "error"
          ? "Unable to add a user"
          : "User added successfully"}
      </AlertSnackbar>
    </>
  );
};

export default AddUserModal;
