import {
  Autocomplete,
  Container,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AddSubstancesToSample } from "@/components";
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
  isLoading: boolean;
  reagentOptions: ReagentOption[];
  locationOptions: LocationOption[];
  handleSubmit: (sampleData: SampleData) => Promise<void>;
};

const AddSampleForm: React.FC<AddSampleFormProps> = ({
  // isLoading,
  // reagentOptions,
  locationOptions,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  const nextYearDate = new Date();
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);

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
      addedSubstances: [],
    },
  });
  // const [selectedReagents, setSelectedReagents] = React.useState<
  //   { id: number; amount: string; unit: string; label: string }[]
  // >([]);
  //
  // const handleReagentChange = (
  //   _event: React.ChangeEvent<unknown>,
  //   value: ReagentOption | null,
  //   index: number
  // ) => {
  //   const newReagents = [...selectedReagents];
  //   if (value) {
  //     const [amount, unit] = value.consumption.split(" ");
  //     newReagents[index] = {
  //       id: value.id,
  //       label: value.label,
  //       amount,
  //       unit,
  //     };
  //     setSelectedReagents(newReagents);
  //     console.log(selectedReagents);
  //     // setValue(
  //     //   "addedSubstances",
  //     //   newReagents.map((reagent) => {
  //     //     return ...selectedReagents, {
  //     //       addedSubstanceId: reagent.id;
  //     //       addedSubstanceQuantity: reagent.amount;
  //     //       addedSubstanceUnit: reagent.unit;
  //     //     }
  //     //   })
  //     // );
  //   }
  // };
  // const handleAmountChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   index: number
  // ) => {
  //   const newReagents = [...selectedReagents];
  //   newReagents[index].amount = event.target.value;
  //   setSelectedReagents(newReagents);
  // };
  // const addReagentField = () => {
  //   setSelectedReagents([
  //     ...selectedReagents,
  //     { id: 0, amount: "", unit: "", label: "" },
  //   ]);
  // };

  const navigate = useNavigate();
  const onSubmit = async (data: SampleData) => {
    await handleSubmit(data);
    navigate(RouteProtectedPath.substances);
  };

  return (
    <Container maxWidth="sm">
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
              label={t("addSubstanceForm.requiredFields.expirationDate.label")}
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
              label={t("addSubstanceForm.requiredFields.quantity.label")}
              type="number"
              {...register("initialQuantity", {
                valueAsNumber: true,
                required: t(
                  "addSubstanceForm.requiredFields.quantity.requiredMessage"
                ),
                min: {
                  value: 1,
                  message: t(
                    "addSubstanceForm.requiredFields.quantity.minQuantityMessage"
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
        <Divider sx={{ marginY: "20px" }} />
        <AddSubstancesToSample />
      </form>
    </Container>
  );
};

export default AddSampleForm;
