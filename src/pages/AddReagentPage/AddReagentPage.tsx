import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

import { AddReagentForm } from "@/components/AddReagentForm";
import { useCreateReagentMutation } from "@/store/reagentApi.ts";
import { ReagentData } from "@/types/reagentData";

const AddReagentPage: React.FC = () => {
  const [reagentData, setReagentData] = useState<ReagentData>({
    name: "",
    description: "",
    structure: "",
    price_per_unit: -1,
    quantity_unit: "",
    quantity_left: -1,
    expiration_date: new Date().toISOString().slice(0, 16),
    location_id: 0,
    cas_number: "",
    producer: "",
    catalog_id: 0,
    catalog_link: "",
  });

  const locationOptions = [
    { id: 1, label: "Location 1" },
    { id: 2, label: "Location 2" },
    { id: 3, label: "Location 3" },
  ];

  const [createReagent] = useCreateReagentMutation();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReagentData({
      ...reagentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationChange = (
    _event: React.ChangeEvent<unknown>,
    value: { id: number; label: string } | null
  ) => {
    setReagentData((prevData) => ({
      ...prevData,
      location_id: value ? value.id : 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReagent(reagentData).unwrap();
      setSnackbarMessage("Reagent added successfully!");
      setSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding reagent:", error);
      setSnackbarMessage("Error adding reagent.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <AddReagentForm
        reagentData={reagentData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleLocationChange={handleLocationChange}
        locationOptions={locationOptions}
      />

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

export default AddReagentPage;
