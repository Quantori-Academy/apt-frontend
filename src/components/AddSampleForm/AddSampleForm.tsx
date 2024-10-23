import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

import { SampleData } from "@/types/sampleData.ts";

type LocationOption = {
  id: number;
  label: string;
};

type ReagentOption = {
  id: number;
  label: string;
};

type AddSampleFormProps = {
  initialSampleData: SampleData;
  handleSubmit: (sampleData: SampleData) => Promise<void>;
  isLoading: boolean;
  reagentOptions: ReagentOption[];
  locationOptions: LocationOption[];
};

const AddSampleForm: React.FC<AddSampleFormProps> = ({
  initialSampleData,
  handleSubmit,
  isLoading,
  reagentOptions,
  locationOptions,
}) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    setValue,
    formState: { errors },
  } = useForm<SampleData>({
    defaultValues: {
      name: "",
      description: "",
      structure: "",
      pricePerUnit: 0,
      quantityUnit: "",
      quantityLeft: 0,
      expirationDate: new Date().toISOString().slice(0, 16),
      locationId: 0,
      addedSubstanceIds: [],
    },
  });

  const handleReagentChange = (
    _event: React.ChangeEvent<unknown>,
    value: ReagentOption[]
  ) => {
    const reagentIdsArray = value.map(({ id }) => id);
    setValue("addedSubstanceIds", reagentIdsArray);
  };

  const handleLocationChange = (
    _event: React.ChangeEvent<unknown>,
    value: LocationOption | null
  ) => {
    setValue("locationId", value ? value.id : 0);
  };

  const onSubmit = async (data: SampleData) => {
    await handleSubmit(data);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Sample
      </Typography>
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              {...register("name", { required: "Name is required" })}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Structure"
              {...register("structure")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              {...register("description")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price per Unit"
              type="number"
              {...register("pricePerUnit", {
                valueAsNumber: true,
                min: { value: 0, message: "Price must be positive" },
              })}
              fullWidth
              margin="normal"
              error={!!errors.pricePerUnit}
              helperText={errors.pricePerUnit?.message}
              InputProps={{
                inputProps: { min: 0 },
              }}
              sx={{
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity Unit"
              {...register("quantityUnit")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Expiration Date"
              type="datetime-local"
              {...register("expirationDate")}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="location-select"
              options={locationOptions}
              getOptionLabel={({ label }) => label}
              onChange={handleLocationChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  placeholder="Select location"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity Left"
              type="number"
              {...register("quantityLeft", {
                valueAsNumber: true,
                min: { value: 0, message: "Quantity must be positive" },
              })}
              fullWidth
              margin="normal"
              error={!!errors.quantityLeft}
              helperText={errors.quantityLeft?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="substances-select"
              options={reagentOptions.filter(
                ({ id }) => !initialSampleData.addedSubstanceIds.includes(id)
              )}
              getOptionLabel={({ label }) => label}
              onChange={handleReagentChange}
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Substances"
                  placeholder="Select substances"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Sample"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddSampleForm;
