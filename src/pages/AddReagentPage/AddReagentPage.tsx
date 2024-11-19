import React from "react";
import { useTranslation } from "react-i18next";

import { AddReagentForm, PageLoader } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useCreateReagentMutation, useGetStorageRoomsQuery } from "@/store";
import { ReagentData } from "@/types";

const AddReagentPage: React.FC = () => {
  const { t } = useTranslation();

  const { data: storageRooms, isLoading } = useGetStorageRoomsQuery();
  const [createReagent] = useCreateReagentMutation();

  const { showSuccess, showError } = useAlertSnackbar();

  const handleCreateReagent = async (reagentData: ReagentData) => {
    try {
      await createReagent(reagentData).unwrap();
      showSuccess(t("addSubstanceForm.snackBarMessages.reagent.success"));
    } catch (error) {
      console.error("Error adding reagent:", error);
      showError(t("addSubstanceForm.snackBarMessages.reagent.error"));
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  const locationOptions =
    storageRooms?.flatMap((room) =>
      room.locations.map((location) => ({
        id: location.locationId,
        label: `${room.room} - ${location.locationName}`,
      }))
    ) || [];

  return (
    <div>
      <AddReagentForm
        handleCreateReagent={handleCreateReagent}
        locationOptions={locationOptions}
      />
    </div>
  );
};

export default AddReagentPage;
