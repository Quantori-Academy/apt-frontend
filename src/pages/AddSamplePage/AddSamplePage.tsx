import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

import { AddSampleForm } from "@/components/AddSampleForm";
import { useCreateSampleMutation } from "@/store/samplesApi.ts";
import { SampleData } from "@/types/sampleData.ts";

const AddSamplePage: React.FC = () => {
  const [sampleData, setSampleData] = useState<SampleData>({
    name: "",
    description: "",
    structure: "",
    price_per_unit: -1,
    quantity_unit: "",
    quantity_left: -1,
    expiration_date: new Date().toISOString().slice(0, 16),
    location_id: -1,
    added_substance_ids: [],
  });

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

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSampleData((prevData) => ({
      ...prevData,
      [name]:
        name === "price_per_unit" || name === "quantity_left"
          ? Number(value)
          : value,
    }));
  };

  const handleReagentChange = (
    _event: React.ChangeEvent<unknown>,
    value: { id: number; label: string }[]
  ) => {
    const reagentIdsArray = value.map((reagent) => reagent.id);
    setSampleData((prevData) => ({
      ...prevData,
      added_substance_ids: reagentIdsArray,
    }));
  };

  const handleLocationChange = (
    _event: React.ChangeEvent<unknown>,
    value: { id: number; label: string } | null
  ) => {
    setSampleData((prevData) => ({
      ...prevData,
      location_id: value ? value.id : 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSample(sampleData).unwrap();
      setSnackbarMessage("Sample added successfully!");
      setSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    } catch (err) {
      console.error("Error adding sample:", err);
      setSnackbarMessage("Error adding sample.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <AddSampleForm
        sampleData={sampleData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleReagentChange={handleReagentChange}
        handleLocationChange={handleLocationChange}
        reagentOptions={reagentOptions}
        locationOptions={locationOptions}
      />
      {isLoading && <p>Loading...</p>}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddSamplePage;
