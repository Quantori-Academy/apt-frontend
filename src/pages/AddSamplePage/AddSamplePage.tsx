import React from "react";
import { useTranslation } from "react-i18next";

import { AddSampleForm, PageLoader } from "@/components";
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

const AddSamplePage: React.FC = () => {
  const { t } = useTranslation();

  const { data: reagentData, isLoading: isReagentsLoading } =
    useGetSubstancesQuery();
  const { data: storageRooms, isLoading: isLocationsLoading } =
    useGetStorageRoomsQuery();

  const [createSample, { isLoading }] = useCreateSampleMutation();

  const { showSuccess, showError } = useAlertSnackbar();

  const handleSubmit = async (sampleData: SampleData) => {
    try {
      await createSample(sampleData).unwrap();
      showSuccess(t("addSubstanceForm.snackBarMessages.sample.success"));
    } catch (error) {
      console.error("Failed to create sample:", error);
      showError(t("addSubstanceForm.snackBarMessages.sample.error"));
    }
  };

  if (isReagentsLoading || isLocationsLoading) {
    return <PageLoader />;
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
      <AddSampleForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        reagentOptions={reagentOptions}
        locationOptions={locationOptions}
        initialSampleData={defaultSampleData}
      />
    </div>
  );
};

export default AddSamplePage;
