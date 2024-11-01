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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
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
  const { t } = useTranslation();

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
  const navigate = useNavigate();
  const onSubmit = async (data: SampleData) => {
    await handleSubmit(data);
    navigate(RouteProtectedPath.substances);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {t("addSubstanceForm.title.sample")}
      </Typography>
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.name.label")}
              {...register("name", {
                required: t(
                  "addSubstanceForm.requiredFields.name.requiredMessage"
                ),
              })}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.structure.label")}
              {...register("structure")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("addSubstanceForm.requiredFields.description.label")}
              {...register("description")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.price.label")}
              type="number"
              {...register("pricePerUnit", {
                valueAsNumber: true,
                required: t(
                  "addSubstanceForm.requiredFields.price.requiredMessage"
                ),
                min: {
                  value: 0,
                  message: t(
                    "addSubstanceForm.requiredFields.price.minPriceMessage"
                  ),
                },
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
              label={t("addSubstanceForm.requiredFields.quantityUnit.label")}
              {...register("quantityUnit", {
                required: {
                  value: true,
                  message: t(
                    "addSubstanceForm.requiredFields.quantityUnit.requiredMessage"
                  ),
                },
              })}
              fullWidth
              margin="normal"
              error={!!errors.quantityUnit}
              helperText={errors.quantityUnit?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.expirationDate.label")}
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
                  label={t("addSubstanceForm.requiredFields.location.label")}
                  placeholder="Select location"
                  fullWidth
                  margin="normal"
                  error={!!errors.locationId}
                  helperText={errors.locationId?.message}
                  {...register("locationId", {
                    required: t(
                      "addSubstanceForm.requiredFields.location.requiredMessage"
                    ),
                  })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("addSubstanceForm.requiredFields.quantity.label")}
              type="number"
              {...register("quantityLeft", {
                valueAsNumber: true,
                required: t(
                  "addSubstanceForm.requiredFields.quantity.requiredMessage"
                ),
                min: {
                  value: 0,
                  message: t(
                    "addSubstanceForm.requiredFields.quantity.minQuantityMessage"
                  ),
                },
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
                  label={t("substances.title")}
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
                {isLoading
                  ? t("substances.buttons.adding")
                  : t("substances.buttons.addSample")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddSampleForm;
