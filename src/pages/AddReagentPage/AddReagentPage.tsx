import React from "react";
import { useTranslation } from "react-i18next";

import { PageLoader } from "@/components";
import { AddReagentForm } from "@/components/AddReagentForm";
import useAlertSnackbar from "@/hooks/useAlertSnackbar";
import { useCreateReagentMutation, useGetStorageRoomsQuery } from "@/store";
import { ReagentData } from "@/types/reagentData";

const AddReagentPage: React.FC = () => {
  const { t } = useTranslation();

  const { data: storageRooms, isLoading } = useGetStorageRoomsQuery();
  const [createReagent] = useCreateReagentMutation();
  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  const handleCreateReagent = async (reagentData: ReagentData) => {
    try {
      await createReagent(reagentData).unwrap();
      openSnackbar(
        "success",
        t("addSubstanceForm.snackBarMessages.reagent.success")
      );
    } catch (error) {
      console.error("Error adding reagent:", error);
      openSnackbar(
        "error",
        t("addSubstanceForm.snackBarMessages.reagent.error")
      );
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  const locationOptions =
    storageRooms?.flatMap((room) =>
      room.locations.map((location) => ({
        id: location.locationId,
        label: location.locationName,
      }))
    ) || [];

  return (
    <div>
      <AddReagentForm
        handleCreateReagent={handleCreateReagent}
        locationOptions={locationOptions}
      />
      <SnackbarComponent />
    </div>
  );
};

export default AddReagentPage;
