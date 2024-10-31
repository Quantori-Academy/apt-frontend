import React from "react";

import { AddSampleForm } from "@/components/AddSampleForm";
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

const AddSamplePage: React.FC = () => {
  const { data: reagentData, isLoading: isReagentsLoading } =
    useGetSubstancesQuery();
  const { data: storageRooms, isLoading: isLocationsLoading } =
    useGetStorageRoomsQuery();

  const [createSample, { isLoading }] = useCreateSampleMutation();

  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  const handleSubmit = async (sampleData: SampleData) => {
    try {
      await createSample(sampleData).unwrap();
      openSnackbar("success", "Sample created successfully!");
    } catch (error) {
      console.error("Failed to create sample:", error);
      openSnackbar("error", "Failed to create sample.");
    }
  };

  if (isReagentsLoading || isLocationsLoading) {
    return <div>Loading...</div>;
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
        label: location.locationName,
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
      <SnackbarComponent />
    </div>
  );
};

export default AddSamplePage;
