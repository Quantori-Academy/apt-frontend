import { Box, Modal, Typography } from "@mui/material";

import { AddUserForm, AddUserStatus } from "@/components/AddUserForm";
import { useAlertSnackbar } from "@/hooks";

import style from "./AddUserModal.module.css";

type AddUserModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  const { openSnackbar, SnackbarComponent } = useAlertSnackbar({
    isOpen: false,
    severity: "success",
    text: "",
  });

  function handleFormSubmit(status: AddUserStatus) {
    if (status === "success") {
      openSnackbar("success", "User added successfully!");
      onClose();
    } else {
      openSnackbar("error", "Failed to add user!");
    }
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
      {SnackbarComponent()}
    </>
  );
};

export default AddUserModal;
