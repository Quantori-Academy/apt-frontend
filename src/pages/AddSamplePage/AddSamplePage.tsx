import React from "react";

import { AddSampleForm } from "@/components/AddSampleForm";
import useAlertSnackbar from "@/hooks/useAlertSnackbar";
import { useCreateSampleMutation } from "@/store/samplesApi.ts";
import { SampleData } from "@/types/sampleData.ts";

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
  const reagentOptions = [
    { id: 1, label: "Reagent 1" },
    { id: 2, label: "Reagent 2" },
    { id: 3, label: "Reagent 3" },
  ];

  const locationOptions = [
    { id: 1, label: "Location 1" },
    { id: 2, label: "Location 2" },
    { id: 3, label: "Location 3" },
  ];

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
