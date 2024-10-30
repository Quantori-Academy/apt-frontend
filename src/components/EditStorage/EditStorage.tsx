import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      openSnackbar("error", t("storage.snackBarMessages.error"));
    } else {
      openSnackbar("success", t("storage.snackBarMessages.success"));
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
              label={t("storage.requiredFields.roomName.label")}
              fullWidth
              margin="normal"
              {...register("roomName", {
                required: t("storage.requiredFields.roomName.requiredMessage"),
              })}
              error={!!errors.roomName}
              helperText={errors.roomName?.message}
            />
            <TextField
              label={t("storage.requiredFields.description.label")}
              fullWidth
              margin="normal"
              {...register("roomDescription", {
                required: t(
                  "storage.requiredFields.description.requiredMessage"
                ),
              })}
              error={!!errors.roomDescription}
              helperText={errors.roomDescription?.message}
            />
            <Box sx={{ display: "flex ", gap: "5px" }}>
              <Button onClick={onClose} color="primary">
                {t("buttons.cancel")}
              </Button>
              <Button type="submit" color="primary" disabled={isUpdating}>
                {isUpdating
                  ? t("storage.buttons.updatingRooms")
                  : t("buttons.save")}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      {SnackbarComponent()}
    </>
  );
};

export default EditStorage;
