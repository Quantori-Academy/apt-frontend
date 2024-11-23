import { Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { AddSampleForm, BasicModal } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import {
  useCreateSampleMutation,
  useGetStorageRoomsQuery,
  useGetSubstancesQuery,
} from "@/store";
import { SampleData } from "@/types";

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
  const { showSuccess, showError } = useAlertSnackbar();

  const handleCreateSample = async (sampleData: SampleData) => {
    try {
      const processedSampleData = {
        ...sampleData,
        structure: sampleData.structure?.trim() || null,
      };

      await createSample(processedSampleData).unwrap();

      showSuccess(t("addSubstanceForm.snackBarMessages.sample.success"));
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create sample:", error);
      showError(t("addSubstanceForm.snackBarMessages.sample.error"));
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
    </div>
  );
};

export default AddSampleModal;
