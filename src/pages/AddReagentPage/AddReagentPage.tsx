import React from "react";

import { AddReagentForm } from "@/components/AddReagentForm";
import useAlertSnackbar from "@/hooks/useAlertSnackbar";
import { useCreateReagentMutation, useGetStorageRoomsQuery } from "@/store";
import { ReagentData } from "@/types/reagentData";

const AddReagentPage: React.FC = () => {
  const { data: storageRooms, isLoading } = useGetStorageRoomsQuery();
  const [createReagent] = useCreateReagentMutation();
  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  const handleCreateReagent = async (reagentData: ReagentData) => {
    try {
      await createReagent(reagentData).unwrap();
      openSnackbar("success", "Reagent added successfully!");
    } catch (error) {
      console.error("Error adding reagent:", error);
      openSnackbar("error", "Error adding reagent.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
