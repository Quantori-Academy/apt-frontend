import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type DeleteModalProps = {
  open: boolean;
  modalTitle: string;
  modalText: string;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  modalTitle,
  modalText,
  onClose,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "18px" }}
        >
          {modalText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ margin: "20px" }}>
        <Button onClick={onClose}>{t("buttons.cancel")}</Button>
        <Button
          onClick={onDelete}
          variant="outlined"
          sx={{
            color: "white",
            bgcolor: "red",
            "&:hover": {
              color: "white",
              backgroundColor: "#e30000",
            },
          }}
          autoFocus
        >
          {t("buttons.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteModal;
