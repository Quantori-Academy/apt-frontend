import { Box, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AddUserForm, AddUserStatus } from "@/components/AddUserForm";
import { useAlertSnackbar } from "@/hooks";

import style from "./AddUserModal.module.css";

type AddUserModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  function handleFormSubmit(status: AddUserStatus) {
    if (status === "success") {
      openSnackbar("success", t("addUserForm.snackBarMessages.success"));
      onClose();
    } else {
      openSnackbar("error", t("addUserForm.snackBarMessages.error"));
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
            {t("addUserForm.title")}
          </Typography>
          <AddUserForm onFormSubmit={handleFormSubmit} />
        </Box>
      </Modal>
      {SnackbarComponent()}
    </>
  );
};

export default AddUserModal;
