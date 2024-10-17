import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type DeleteModalProps = {
  open: boolean;
  modalTitle: string;
  modalText: string;
  onClose: () => void;
  onDelete: () => void;
};
const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  modalTitle,
  modalText,
  onDelete,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modalText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} variant="outlined" color="error" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteModal;
