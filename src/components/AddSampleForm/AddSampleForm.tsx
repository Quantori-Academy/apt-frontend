import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { SampleData } from "@/types";

type SubstanceOption = {
  id: number;
  name: string;
  quantityLeft: number;
  unit: string;
};

type LocationOption = {
  id: number;
  label: string;
};

type AddSampleFormProps = {
  handleSubmitForm: (sampleData: SampleData) => Promise<void>;
  isLoading: boolean;
  locationOptions: LocationOption[];
  reagentOptions: SubstanceOption[];
  initialSampleData: SampleData;
};
const todayPlusOneYear = new Date();
todayPlusOneYear.setFullYear(todayPlusOneYear.getFullYear() + 1);

const defaultExpirationDate = todayPlusOneYear.toISOString().slice(0, 10);
const AddSampleForm: React.FC<AddSampleFormProps> = ({
  handleSubmitForm,
  isLoading,
  locationOptions,
  reagentOptions,
  initialSampleData,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SampleData>({
    defaultValues: {
      ...initialSampleData,
      expirationDate: defaultExpirationDate,
    },
  });

  const addedSubstances = watch("addedSubstances");

  const handleAddSubstance = () => {
    setValue("addedSubstances", [
      ...addedSubstances,
      {
        addedSubstanceId: 0,
        addedSubstanceQuantity: 0,
        addedSubstanceUnit: "",
      },
    ]);
  };

  const handleSubstanceChange = <T extends string | number>(
    index: number,
    field: string,
    value: T
  ) => {
    const updatedSubstances = [...addedSubstances];
    updatedSubstances[index] = {
      ...updatedSubstances[index],
      [field]: value,
    };
    setValue("addedSubstances", updatedSubstances);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
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
          <Grid item xs={12}>
            <TextField
              label={t("addSubstanceForm.requiredFields.initialQuantity.label")}
              type="number"
              {...register("initialQuantity", {
                required: t(
                  "addSubstanceForm.requiredFields.initialQuantity.requiredMessage"
                ),
                min: {
                  value: 0,
                  message: t(
                    "addSubstanceForm.requiredFields.initialQuantity.minQuantityMessage"
                  ),
                },
              })}
              fullWidth
              error={!!errors.initialQuantity}
              helperText={errors.initialQuantity?.message}
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
              render={({ field }) => (
                <Autocomplete
                  options={locationOptions}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) => field.onChange(value?.id || 0)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t(
                        "addSubstanceForm.requiredFields.location.label"
                      )}
                      error={!!errors.locationId}
                      helperText={errors.locationId?.message}
                      fullWidth
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <TextField
              label={t("addSubstanceForm.requiredFields.amount.label")}
              type="number"
              {...register("amount", {
                valueAsNumber: true,
                required: t(
                  "addSubstanceForm.requiredFields.amount.requiredMessage"
                ),
                min: {
                  value: 0,
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

          <Grid item xs={12}>
            <TextField
              label={t("addSubstanceForm.requiredFields.structure.label")}
              {...register("structure")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleAddSubstance}>
              Add Substance
            </Button>
          </Grid>
          {addedSubstances.map((substance, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              alignItems="center"
              style={{ marginTop: "16px", marginBottom: "16px" }}
            >
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={reagentOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) =>
                    handleSubstanceChange(
                      index,
                      "addedSubstanceId",
                      value?.id || 0
                    )
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Substance" fullWidth />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label={t("addSubstanceForm.requiredFields.quantity.label")}
                  type="number"
                  inputProps={{
                    min: 0,
                    max:
                      reagentOptions.find(
                        (option) => option.id === substance.addedSubstanceId
                      )?.quantityLeft || 0,
                  }}
                  value={substance.addedSubstanceQuantity}
                  onChange={(e) =>
                    handleSubstanceChange(
                      index,
                      "addedSubstanceQuantity",
                      Number(e.target.value)
                    )
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={1}>
                <Box>
                  {reagentOptions.find(
                    (option) => option.id === substance.addedSubstanceId
                  )?.unit || ""}
                </Box>
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddSampleForm;
