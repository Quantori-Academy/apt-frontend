import { Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { AddSampleForm } from "@/components/AddSampleForm";
import { BasicModal } from "@/components/BasicModal";
import useAlertSnackbar from "@/hooks/useAlertSnackbar";
import { useCreateSampleMutation } from "@/store";
import { useGetStorageRoomsQuery } from "@/store/storageApi";
import { useGetSubstancesQuery } from "@/store/substancesApi";
import { SampleData } from "@/types/sampleData";

const defaultSampleData: SampleData = {
  name: "",
  description: "",
  structure: "",
  pricePerUnit: 0,
  quantityUnit: "",
  quantityLeft: 0,
  expirationDate: "",
  locationId: 0,
  addedSubstanceIds: [],
};

const AddSampleModal: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const { data: reagentData, isLoading: isReagentsLoading } =
    useGetSubstancesQuery();
  const { data: storageRooms, isLoading: isLocationsLoading } =
    useGetStorageRoomsQuery();

  const [createSample, { isLoading }] = useCreateSampleMutation();
  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  const handleCreateSample = async (sampleData: SampleData) => {
    try {
      const processedSampleData = {
        ...sampleData,
        structure: sampleData.structure?.trim() || undefined,
      };

      await createSample(processedSampleData).unwrap();

      openSnackbar(
        "success",
        t("addSubstanceForm.snackBarMessages.sample.success")
      );
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create sample:", error);
      openSnackbar(
        "error",
        t("addSubstanceForm.snackBarMessages.sample.error")
      );
    }
  };

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  if (isReagentsLoading || isLocationsLoading) {
    return null;
  }

  const reagentOptions =
    reagentData?.map((reagent) => ({
      id: Number(reagent.id),
      label: reagent.name,
      consumption: reagent.quantityLeft,
    })) || [];

  const locationOptions =
    storageRooms?.flatMap((room) =>
      room.locations.map((location) => ({
        id: Number(location.locationId),
        label: `${room.room} - ${location.locationName}`,
      }))
    ) || [];

  return (
    <div>
      <Button variant="contained" onClick={handleOpenModal}>
        {t("substances.buttons.addSample")}
      </Button>

      <BasicModal
        title={t("addSubstanceForm.title.sample")}
        isOpen={isOpen}
        closeModal={handleCloseModal}
        width="700px"
        height="600px"
      >
        <AddSampleForm
          handleSubmit={handleCreateSample}
          isLoading={isLoading}
          reagentOptions={reagentOptions}
          locationOptions={locationOptions}
          initialSampleData={defaultSampleData}
        />
      </BasicModal>

      <SnackbarComponent />
    </div>
  );
};

export default AddSampleModal;
