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
import { useNavigate } from "react-router-dom";

import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { ReagentData } from "@/types/reagentData";

type LocationOption = {
  id: string;
  label: string;
};

type AddReagentFormProps = {
  handleCreateReagent: (reagentData: ReagentData) => Promise<void>;
  locationOptions: LocationOption[];
};

const AddReagentForm: React.FC<AddReagentFormProps> = ({
  handleCreateReagent,
  locationOptions,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReagentData>({
    defaultValues: {
      name: "",
      description: "",
      structure: "",
      pricePerUnit: 0,
      quantityUnit: "",
      quantityLeft: 0,
      expirationDate: new Date().toISOString().slice(0, 16),
      locationId: "0",
      casNumber: "",
      producer: "",
      catalogId: 0,
      catalogLink: "",
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data: ReagentData) => {
    await handleCreateReagent(data);
    navigate(RouteProtectedPath.substances);
  };

  const handleLocationChange = (
    _event: React.ChangeEvent<unknown>,
    value: LocationOption | null
  ) => {
    setValue("locationId", value ? value.id : "0");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Reagent
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              {...register("name", { required: "Name is required" })}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
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
          <Grid item xs={12}>
            <TextField
              label="Structure"
              {...register("structure")}
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
          <Grid item xs={6}>
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
              label="Expiration Date"
              type="datetime-local"
              {...register("expirationDate")}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="location-select"
              options={locationOptions}
              getOptionLabel={(option) => option.label}
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="CAS Number"
              {...register("casNumber")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Producer"
              {...register("producer")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Catalog ID"
              type="number"
              {...register("catalogId", {
                valueAsNumber: true,
                min: { value: 0, message: "Catalog ID must be positive" },
              })}
              fullWidth
              margin="normal"
              error={!!errors.catalogId}
              helperText={errors.catalogId?.message}
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
          <Grid item xs={12}>
            <TextField
              label="Catalog Link"
              {...register("catalogLink")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                Add Reagent
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddReagentForm;
