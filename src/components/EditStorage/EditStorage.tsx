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
import { handleError } from "@/utils";

type EditStorageProps = {
  open: boolean;
  id: string;
  onClose: () => void;
};

type editRoomSelect = {
  roomName: string;
  roomDescription: string;
};

const EditStorage: React.FC<EditStorageProps> = ({ open, id, onClose }) => {
  const { t } = useTranslation();

  const [updateStorageRoom, { isLoading: isUpdating }] =
    useUpdateStorageRoomMutation();

  const { showSuccess, showError } = useAlertSnackbar();

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

    try {
      await updateStorageRoom({
        id,
        room: roomName,
        description: roomDescription,
      }).unwrap();
      showSuccess(t("storage.snackBarMessages.success"));
      onClose();
    } catch (error) {
      handleError({ error, t, showError });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{t("storage.title.editRoom")}</DialogTitle>
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
    </>
  );
};

export default EditStorage;
