import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  addStorageLocation,
  selectStorageError,
  selectStorageStatus,
} from "@/store/slices/storageSlice";

interface Props {
  onCancel: () => void;
  onAddLocation: (message: string) => void;
}

const AddStorageLocation: React.FC<Props> = ({ onCancel, onAddLocation }) => {
  const dispatch = useAppDispatch();
  const [room, setRoom] = useState("");

  const status = useAppSelector(selectStorageStatus);
  const error = useAppSelector(selectStorageError);

  const handleSaveLocation = () => {
    if (room) {
      dispatch(addStorageLocation({ room }))
        .unwrap()
        .then(() => {
          onAddLocation("Storage location added successfully!");
          setRoom("");
          onCancel();
        })
        .catch((err) => {
          console.error("Failed to add storage location:", err);
        });
    }
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Add New Storage Location</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Room"
          fullWidth
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          margin="normal"
        />
        {status === "loading" && <p>Saving location...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSaveLocation}
          color="primary"
          disabled={status === "loading"}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStorageLocation;
