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

import { useAlertSnackbar } from "@/hooks";
import { useCreateStorageRoomMutation } from "@/store/storageApi.ts";
import { StorageRoomsBrief } from "@/types";

type AddStorageDialogProps = {
  open: boolean;
  onClose: () => void;
  storages: Array<StorageRoomsBrief>;
};
const AddStorageDialog: React.FC<AddStorageDialogProps> = ({
  open,
  onClose,
  storages,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [locationName, setLocationName] = useState<string>("");
  const [createStorageRoom, { isLoading: isCreating }] =
    useCreateStorageRoomMutation();

  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const handleCreateSubmit = async () => {
    const { error } = await createStorageRoom({
      roomId: selectedRoomId,
      locationName: locationName,
    });

    if (!error) {
      onClose();
      setSelectedRoomId(0);
      setLocationName("");
    } else {
      openSnackbar("error", "Failed to create storage location!");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create New Storage Location</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Room</InputLabel>
            <Select
              variant="outlined"
              label="Room"
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value as number)}
            >
              <MenuItem value={0} disabled>
                Select a room
              </MenuItem>
              {storages?.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.room}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Location Name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            fullWidth
            margin="normal"
            disabled={selectedRoomId === 0}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateSubmit}
            color="primary"
            disabled={isCreating || selectedRoomId === 0 || locationName === ""}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      {SnackbarComponent()}
    </>
  );
};

export default AddStorageDialog;
