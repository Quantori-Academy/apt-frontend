import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { AddSampleForm } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useCreateSampleMutation, useGetStorageRoomsQuery } from "@/store";
import { SampleData } from "@/types";

const AddSampleModal: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const { data: storageRooms, isLoading: isLocationsLoading } =
    useGetStorageRoomsQuery();

  const [createSample, { isLoading }] = useCreateSampleMutation();
  const { showSuccess, showError } = useAlertSnackbar();

  const handleCreateSample = async (sampleData: SampleData) => {
    if (!sampleData.addedSubstances.length) {
      showError(t("addSubstanceForm.snackBarMessages.sample.validationError"));
    } else {
      try {
        await createSample(sampleData).unwrap();
        showSuccess(t("addSubstanceForm.snackBarMessages.sample.success"));
        setIsOpen(false);
      } catch (error) {
        console.error("Failed to create sample:", error);
        showError(t("addSubstanceForm.snackBarMessages.sample.error"));
      }
    }
  };

  if (isLocationsLoading) {
    return null;
  }

  const locationOptions =
    storageRooms?.flatMap((room) =>
      room.locations.map((location) => ({
        id: Number(location.locationId),
        label: `${room.room} - ${location.locationName}`,
      }))
    ) || [];

  return (
    <div>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        {t("substances.buttons.addSample")}
      </Button>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <IconButton
          onClick={() => setIsOpen(false)}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            width: "70vw",
            height: "100%",
            padding: 5,
          }}
        >
          <AddSampleForm
            handleSubmit={handleCreateSample}
            isLoading={isLoading}
            locationOptions={locationOptions}
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default AddSampleModal;
