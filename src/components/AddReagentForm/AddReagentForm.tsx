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

import { ReagentData } from "@/types/reagentData";

interface AddReagentFormProps {
  reagentData: ReagentData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleLocationChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: { id: number; label: string } | null
  ) => void;
  locationOptions: { id: number; label: string }[];
}

const AddReagentForm: React.FC<AddReagentFormProps> = ({
  reagentData,
  handleChange,
  handleSubmit,
  handleLocationChange,
  locationOptions,
}) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Reagent
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={reagentData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={reagentData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Structure"
              name="structure"
              value={reagentData.structure}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price per Unit"
              name="price_per_unit"
              type="number"
              placeholder="Enter price per unit"
              value={
                reagentData.price_per_unit === -1
                  ? ""
                  : reagentData.price_per_unit
              }
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: { min: 0 },
                style: { appearance: "textfield" },
                onKeyDown: (e) => {
                  if (e.key === "e" || e.key === "E") {
                    e.preventDefault();
                  }
                },
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
          <Grid item xs={6}>
            <TextField
              label="Quantity Left"
              name="quantity_left"
              type="number"
              value={
                reagentData.quantity_left === -1
                  ? ""
                  : reagentData.quantity_left
              }
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: { min: 0 },
                style: { appearance: "textfield" },
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
              label="Expiration Date"
              name="expiration_date"
              type="datetime-local"
              value={reagentData.expiration_date.slice(0, 16)}
              onChange={handleChange}
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
              name="cas_number"
              value={reagentData.cas_number}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Producer"
              name="producer"
              value={reagentData.producer}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Catalog ID"
              name="catalog_id"
              type="number"
              value={reagentData.catalog_id}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Catalog Link"
              name="catalog_link"
              value={reagentData.catalog_link}
              onChange={handleChange}
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
