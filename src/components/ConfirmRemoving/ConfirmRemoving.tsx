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
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "18px" }}
        >
          {modalText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ margin: "20px" }}>
        <Button onClick={onClose}>Cancel</Button>
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
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteModal;
