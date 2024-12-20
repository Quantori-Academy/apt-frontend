import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAlertSnackbar } from "@/hooks";
import { useCreateStorageRoomMutation } from "@/store";
import { StorageRoomsBrief } from "@/types";
import { handleError } from "@/utils";

type AddStorageDialogProps = {
  open: boolean;
  storages: Array<StorageRoomsBrief>;
  onClose: () => void;
};
const AddStorageDialog: React.FC<AddStorageDialogProps> = ({
  open,
  storages,
  onClose,
}) => {
  const { t } = useTranslation();

  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [createStorageRoom, { isLoading: isCreating }] =
    useCreateStorageRoomMutation();

  const { showSuccess, showError } = useAlertSnackbar();

  const handleCreateSubmit = async () => {
    try {
      await createStorageRoom({
        roomId: selectedRoomId,
        locationName: locationName,
      }).unwrap();

      showSuccess(t("storage.snackBarMessages.creationSuccess"));
      onClose();
      setSelectedRoomId("0");
      setLocationName("");
    } catch (error) {
      handleError({ error, t, showError });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{t("storage.buttons.createLocation")}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t("storage.fields.room")}</InputLabel>
            <Select
              variant="outlined"
              label={t("storage.fields.room")}
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
            >
              <MenuItem value={0} disabled>
                {t("storage.fields.selectRoom")}
              </MenuItem>
              {storages?.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.room}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label={t("storage.fields.locationName")}
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            fullWidth
            margin="normal"
            disabled={selectedRoomId === "0"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t("buttons.cancel")}
          </Button>
          <Button
            onClick={handleCreateSubmit}
            color="primary"
            disabled={
              isCreating || selectedRoomId === "0" || locationName === ""
            }
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

export default AddStorageDialog;
