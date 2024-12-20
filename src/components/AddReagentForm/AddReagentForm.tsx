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

import { StructureEditorField } from "@/components";
import { RouteProtectedPath } from "@/router";
import { ReagentData } from "@/types";

type LocationOption = {
  id: number;
  label: string;
};

type AddReagentFormProps = {
  locationOptions: LocationOption[];
  handleCreateReagent: (reagentData: ReagentData) => Promise<void>;
};

const AddReagentForm: React.FC<AddReagentFormProps> = ({
  locationOptions,
  handleCreateReagent,
}) => {
  const { t } = useTranslation();

  const todayPlusOneYear = new Date();
  todayPlusOneYear.setFullYear(todayPlusOneYear.getFullYear() + 1);

  const defaultExpirationDate = todayPlusOneYear.toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReagentData>({
    defaultValues: {
      name: "",
      description: null,
      structure: null,
      pricePerUnit: null,
      unit: "",
      initialQuantity: null,
      amount: null,
      expirationDate: defaultExpirationDate,
      locationId: null,
      casNumber: null,
      producer: null,
      catalogId: null,
      catalogLink: null,
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <Controller
              name="structure"
              control={control}
              render={({ field }) => (
                <StructureEditorField
                  value={field.value || ""}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
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

          <Grid item xs={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.price.label")}
              type="number"
              inputProps={{ min: 0, step: "any" }}
              {...register("pricePerUnit", {
                valueAsNumber: true,
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
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.amount.label")}
              type="number"
              {...register("amount", {
                valueAsNumber: true,
                required: t(
                  "addSubstanceForm.requiredFields.amount.requiredMessage"
                ),
                min: {
                  value: 1,
                  message: t(
                    "addSubstanceForm.requiredFields.amount.minAmountMessage"
                  ),
                },
              })}
              fullWidth
              margin="normal"
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.initialQuantity.label")}
              type="number"
              inputProps={{ min: 0.01, step: "any" }}
              {...register("initialQuantity", {
                valueAsNumber: true,
                required: t(
                  "addSubstanceForm.requiredFields.initialQuantity.requiredMessage"
                ),
                min: {
                  value: 0.01,
                  message: t(
                    "addSubstanceForm.requiredFields.initialQuantity.minQuantityMessage"
                  ),
                },
              })}
              fullWidth
              margin="normal"
              error={!!errors.initialQuantity}
              helperText={errors.initialQuantity?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.unit.label")}
              {...register("unit", {
                required: t(
                  "addSubstanceForm.requiredFields.unit.requiredMessage"
                ),
              })}
              fullWidth
              margin="normal"
              error={!!errors.unit}
              helperText={errors.unit?.message}
            />
          </Grid>

          <Grid item xs={6}>
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
                    field.onChange(value ? value.id : null)
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
          <Grid item xs={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.expirationDate.label")}
              type="date"
              {...register("expirationDate")}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.producer.label")}
              {...register("producer")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("addSubstanceForm.requiredFields.CASNumber.label")}
              {...register("casNumber")}
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
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
            />
          </Grid>
          <Grid item xs={6}>
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
