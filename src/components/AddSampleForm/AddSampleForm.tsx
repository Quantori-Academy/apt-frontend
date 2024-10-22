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

import { SampleData } from "@/types/sampleData.ts";

interface AddSampleFormProps {
  sampleData: SampleData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleReagentChange: (
    e: React.ChangeEvent<unknown>,
    value: { id: number; label: string }[]
  ) => void; // Updated
  handleLocationChange: (
    e: React.ChangeEvent<unknown>,
    value: { id: number; label: string } | null
  ) => void; // Updated
  reagentOptions: { id: number; label: string }[];
  locationOptions: { id: number; label: string }[];
}

const AddSampleForm: React.FC<AddSampleFormProps> = ({
  sampleData,
  handleChange,
  handleSubmit,
  handleReagentChange,
  handleLocationChange,
  reagentOptions,
  locationOptions,
}) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Sample
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={sampleData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Structure"
              name="structure"
              value={sampleData.structure}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={sampleData.description}
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
                sampleData.price_per_unit === -1
                  ? ""
                  : sampleData.price_per_unit
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

          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity Unit"
              name="quantity_unit"
              value={sampleData.quantity_unit}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Expiration Date"
              name="expiration_date"
              type="datetime-local"
              value={sampleData.expiration_date.slice(0, 16)}
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
              onChange={handleLocationChange} // Remains the same
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
              name="quantity_left"
              type="number"
              value={
                sampleData.quantity_left === -1 ? "" : sampleData.quantity_left
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

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="substances-select"
              options={reagentOptions.filter(
                (option) => !sampleData.added_substance_ids.includes(option.id)
              )}
              getOptionLabel={(option) => option.label}
              onChange={handleReagentChange} // Remains the same
              disableCloseOnSelect
              ListboxProps={{
                style: {
                  maxHeight: "200px",
                  overflow: "auto",
                },
              }}
              renderOption={(props, option) => (
                <li {...props}>{option.label}</li>
              )}
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
              <Button variant="contained" color="primary" type="submit">
                Add Sample
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddSampleForm;
