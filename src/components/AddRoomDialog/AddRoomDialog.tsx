import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAlertSnackbar } from "@/hooks";
import { useCreateRoomMutation } from "@/store";

type AddRoomDialogProps = {
  open: boolean;
  onClose: () => void;
};
const AddRoomDialog: React.FC<AddRoomDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [createStorageRoom, { isLoading: isCreating }] =
    useCreateRoomMutation();

  const { showSuccess, showError } = useAlertSnackbar();

  const handleCreateSubmit = async () => {
    const { error } = await createStorageRoom({
      room: roomName,
      description,
    });

    if (!error) {
      onClose();
      setRoomName("");
      setDescription("");
      showSuccess(t("storage.snackBarMessages.creationSuccess"));
    } else {
      showError(t("storage.snackBarMessages.creationError"));
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{t("storage.buttons.createRoom")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("storage.fields.room")}
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t("storage.fields.description")}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t("buttons.cancel")}
          </Button>
          <Button
            onClick={handleCreateSubmit}
            color="primary"
            disabled={isCreating || !roomName}
          >
            {isCreating
              ? t("storage.buttons.creatingLocation")
              : t("buttons.create")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRoomDialog;
