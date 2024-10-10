import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addStorageLocation } from "@/store/slices/storageSlice";
import { StorageLocation } from "@/types";

interface Props {
  onCancel: () => void;
  onAddLocation: (newLocation: StorageLocation) => void;
}

const AddStorageLocation: React.FC<Props> = ({ onCancel, onAddLocation }) => {
  const dispatch = useAppDispatch();
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const handleSaveLocation = () => {
    if (room && name) {
      const newLocation: StorageLocation = {
        id: Math.floor(Math.random() * 1000000),
        room,
        name,
        description: "No description provided",
      };

      dispatch(addStorageLocation(newLocation));

      onAddLocation(newLocation);

      setRoom("");
      setName("");
      onCancel();
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
        <TextField
          placeholder="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveLocation} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStorageLocation;
