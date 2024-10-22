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
      await createReagent(reagentData);
      console.log("Reagent added successfully.");
    } catch (error) {
      console.error(error);
    }
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
    </div>
  );
};

export default AddReagentPage;
