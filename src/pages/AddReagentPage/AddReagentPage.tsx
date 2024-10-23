import React from "react";

import { AddReagentForm } from "@/components/AddReagentForm";
import useAlertSnackbar from "@/hooks/useAlertSnackbar";
import { useCreateReagentMutation } from "@/store/reagentApi.ts";
import { ReagentData } from "@/types/reagentData";

const AddReagentPage: React.FC = () => {
  const locationOptions = [
    { id: 1, label: "Location 1" },
    { id: 2, label: "Location 2" },
    { id: 3, label: "Location 3" },
  ];

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
