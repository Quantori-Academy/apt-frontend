import React from "react";
import { useTranslation } from "react-i18next";

import { PageLoader } from "@/components";
import { AddSampleForm } from "@/components/AddSampleForm";
// import { RoomOption } from "@/components/AddSampleForm/AddSampleForm";
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
  const { t } = useTranslation();

  const { data: reagentData, isLoading: isReagentsLoading } =
    useGetSubstancesQuery();
  const { data: storageRooms, isLoading: isLocationsLoading } =
    useGetStorageRoomsQuery();

  const [createSample, { isLoading }] = useCreateSampleMutation();

  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  const handleSubmit = async (sampleData: SampleData) => {
    try {
      await createSample(sampleData).unwrap();
      openSnackbar(
        "success",
        t("addSubstanceForm.snackBarMessages.sample.success")
      );
    } catch (error) {
      console.error("Failed to create sample:", error);
      openSnackbar(
        "error",
        t("addSubstanceForm.snackBarMessages.sample.error")
      );
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

  const locationOptions = storageRooms?.flatMap((room) => room) || [];
  // const locationOptions: RoomOption[] =
  //   storageRooms?.map((room) => ({
  //     id: Number(room.id),
  //     room: room.room,
  //     locations: room.locations.map((location) => ({
  //       locationId: Number(location.locationId),
  //       locationName: location.locationName,
  //     })),
  //   })) || [];

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
