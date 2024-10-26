import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

import { useAlertSnackbar } from "@/hooks";
import { useUpdateStorageRoomMutation } from "@/store";

type EditStorageProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

type editRoomSelect = {
  roomName: string;
  roomDescription: string;
};

const EditStorage: React.FC<EditStorageProps> = ({ open, onClose, id }) => {
  const [updateStorageRoom, { isLoading: isUpdating }] =
    useUpdateStorageRoomMutation();
  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editRoomSelect>({
    defaultValues: {
      roomName: "",
      roomDescription: "",
    },
  });

  const onSubmit = async (editedStorage: editRoomSelect) => {
    const { roomName, roomDescription } = editedStorage;
    const { error } = await updateStorageRoom({
      id,
      room: roomName,
      description: roomDescription,
    });

    if (error) {
      openSnackbar("error", "Failed to edit room!");
    } else {
      openSnackbar("success", "Room edited successfully!");
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Storage Room</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Room Name"
              fullWidth
              margin="normal"
              {...register("roomName", {
                required: "room name is required",
              })}
              error={!!errors.roomName}
              helperText={errors.roomName?.message}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              {...register("roomDescription", {
                required: "Description is required",
              })}
              error={!!errors.roomDescription}
              helperText={errors.roomDescription?.message}
            />
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {SnackbarComponent()}
    </>
  );
};

export default EditStorage;
