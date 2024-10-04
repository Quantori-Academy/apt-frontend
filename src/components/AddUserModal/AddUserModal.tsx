import { Box, Modal, Typography } from "@mui/material";

import { AddUserForm } from "@/components/AddUserForm";

import style from "./AddUserModal.module.css";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}
const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  return (
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
        <AddUserForm />
      </Box>
    </Modal>
  );
};

export default AddUserModal;
