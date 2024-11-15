import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
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

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              label={t("addSubstanceForm.requiredFields.description.label")}
              {...register("description")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("addSubstanceForm.requiredFields.structure.label")}
              {...register("structure")}
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
              label={t("addSubstanceForm.requiredFields.expirationDate.label")}
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
            <TextField
              label={t("addSubstanceForm.requiredFields.quantityUnit.label")}
              {...register("quantityUnit", {
                required: t(
                  "addSubstanceForm.requiredFields.quantityUnit.requiredMessage"
                ),
              })}
              fullWidth
              margin="normal"
              error={!!errors.quantityUnit}
              helperText={errors.quantityUnit?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="locationId"
              control={control}
              rules={{
                required: t(
                  "addSubstanceForm.requiredFields.location.requiredMessage"
                ),
              }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  id="location-select"
                  options={locationOptions}
                  getOptionLabel={({ label }) => label}
                  onChange={(_event, value) =>
                    field.onChange(value ? value.id : 0)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t(
                        "addSubstanceForm.requiredFields.location.label"
                      )}
                      placeholder="Select location"
                      fullWidth
                      margin="normal"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.CASNumber.label")}
              {...register("casNumber")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.producer.label")}
              {...register("producer")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("addSubstanceForm.requiredFields.catalogId.label")}
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
              label={t("addSubstanceForm.requiredFields.catalogLink.label")}
              {...register("catalogLink")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                {t("substances.buttons.addReagent")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddReagentForm;
