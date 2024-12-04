import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AddSubstancesToSample, AddedSubstancesInSample } from "@/components";
import { RouteProtectedPath } from "@/router";
import { AddedSubstanceDetails, SampleData, SampleSubstances } from "@/types";

type LocationOption = {
  id: number;
  label: string;
};

type AddSampleFormProps = {
  isLoading: boolean;
  locationOptions: LocationOption[];
  handleSubmit: (sampleData: SampleData) => Promise<void>;
};

const AddSampleForm: React.FC<AddSampleFormProps> = ({
  locationOptions,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  const nextYearDate = new Date();
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);

  const [addedSubstances, setAddedSubstances] = useState<
    Array<SampleSubstances>
  >([]);
  const [addedSubstancesDetails, setAddedSubstancesDetails] = useState<
    AddedSubstanceDetails[]
  >([]);

  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    formState: { errors },
  } = useForm<SampleData>({
    defaultValues: {
      name: "",
      description: "",
      structure: "",
      unit: "",
      initialQuantity: 0,
      amount: 0,
      expirationDate: nextYearDate.toISOString().slice(0, 10),
      locationId: 0,
    },
  });

  const navigate = useNavigate();
  const onSubmit = async (data: SampleData) => {
    data.addedSubstances = addedSubstances;

    await handleSubmit(data);
    navigate(RouteProtectedPath.substances);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={6}>
        <Typography variant="h6">
          {t("addSubstanceForm.title.sample")}
        </Typography>

        <form onSubmit={handleFormSubmit(onSubmit)}>
          <Grid container spacing={1}>
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
                label={t(
                  "addSubstanceForm.requiredFields.expirationDate.label"
                )}
                type="date"
                {...register("expirationDate", {
                  required: t(
                    "addSubstanceForm.requiredFields.expirationDate.requiredMessage"
                  ),
                })}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                label={t(
                  "addSubstanceForm.requiredFields.initialQuantity.label"
                )}
                type="number"
                {...register("initialQuantity", {
                  valueAsNumber: true,
                  required: t(
                    "addSubstanceForm.requiredFields.initialQuantity.requiredMessage"
                  ),
                  min: {
                    value: 1,
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                label={t("addSubstanceForm.requiredFields.amount.label")}
                {...register("amount", {
                  min: {
                    value: 1,
                    message: t(
                      "addSubstanceForm.requiredFields.amount.minQuantityMessage"
                    ),
                  },
                  required: {
                    value: true,
                    message: t(
                      "addSubstanceForm.requiredFields.amount.requiredMessage"
                    ),
                  },
                })}
                fullWidth
                margin="normal"
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            </Grid>
          </Grid>
          <Box>
            <Typography variant="h6" marginY="20px">
              {t("addSubstanceForm.title.addedSubstances")}
            </Typography>
            {!addedSubstances.length ? (
              <Typography margin="20px">
                {t("addSubstanceForm.emptyAreas.noAddedSubstances")}
              </Typography>
            ) : (
              <AddedSubstancesInSample
                substancesDetails={addedSubstancesDetails}
                onChangeSubstancesDetails={setAddedSubstancesDetails}
                onChangesAddedSubstances={setAddedSubstances}
              />
            )}
          </Box>
          <Button type="submit" sx={{ marginTop: "10px" }}>
            {t("addSubstanceForm.buttons.createSample")}
          </Button>
        </form>
      </Grid>
      <Grid item xs={6} paddingLeft={5} width="100%">
        <AddSubstancesToSample
          setAddedSubstances={setAddedSubstances}
          setAddedSubstancesDetails={setAddedSubstancesDetails}
        />
      </Grid>
    </Grid>
  );
};

export default AddSampleForm;
