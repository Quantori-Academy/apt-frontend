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
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RouteProtectedPath } from "@/router";
import { SampleData } from "@/types";

type LocationOption = {
  id: number;
  label: string;
};

type ReagentOption = {
  id: number;
  label: string;
  consumption: string;
};

type AddSampleFormProps = {
  initialSampleData: SampleData;
  isLoading: boolean;
  reagentOptions: ReagentOption[];
  locationOptions: LocationOption[];
  handleSubmit: (sampleData: SampleData) => Promise<void>;
};

const AddSampleForm: React.FC<AddSampleFormProps> = ({
  isLoading,
  reagentOptions,
  locationOptions,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit: handleFormSubmit,
    setValue,
    control,
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
  const [selectedReagents, setSelectedReagents] = React.useState<
    { id: number; amount: string; unit: string; label: string }[]
  >([]);

  const handleReagentChange = (
    _event: React.ChangeEvent<unknown>,
    value: ReagentOption | null,
    index: number
  ) => {
    const newReagents = [...selectedReagents];
    if (value) {
      const [amount, unit] = value.consumption.split(" ");
      newReagents[index] = {
        id: value.id,
        label: value.label,
        amount,
        unit,
      };
      setSelectedReagents(newReagents);
      setValue(
        "addedSubstanceIds",
        newReagents.map((reagent) => reagent.id)
      );
    }
  };
  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newReagents = [...selectedReagents];
    newReagents[index].amount = event.target.value;
    setSelectedReagents(newReagents);
  };
  const addReagentField = () => {
    setSelectedReagents([
      ...selectedReagents,
      { id: 0, amount: "", unit: "", label: "" },
    ]);
  };

  const navigate = useNavigate();
  const onSubmit = async (data: SampleData) => {
    await handleSubmit(data);
    navigate(RouteProtectedPath.substances);
  };

  return (
    <Container maxWidth="sm">
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
            <Button
              variant="outlined"
              onClick={addReagentField}
              disabled={selectedReagents.length >= reagentOptions.length}
              fullWidth
            >
              {t("substances.buttons.chooseSubstance")}
            </Button>
          </Grid>
          {selectedReagents.map((reagent, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={reagentOptions}
                  getOptionLabel={({ label }) => label}
                  onChange={(event, value) =>
                    handleReagentChange(event, value, index)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t(
                        "addSubstanceForm.requiredFields.substance.label"
                      )}
                      placeholder="Select reagent"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <TextField
                  label={t("addSubstanceForm.requiredFields.consumption.label")}
                  value={reagent.amount}
                  onChange={(event) => handleAmountChange(event, index)}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                />
                <Typography sx={{ marginTop: 1 }}>{reagent.unit}</Typography>
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
