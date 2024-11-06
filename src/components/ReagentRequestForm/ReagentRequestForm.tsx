import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ReagentRequestInput } from "@/types";

import style from "@/components/AddUserForm/AddUserForm.module.css";

type ReagentRequestFormProps = {
  onSubmit: (newReagentRequest: ReagentRequestInput) => void;
  isLoading: boolean;
  onClose: () => void;
  isEdit: boolean;
};

const ReagentRequestForm: React.FC<ReagentRequestFormProps> = ({
  onSubmit,
  isLoading,
  onClose,
  isEdit,
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<ReagentRequestInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Stack spacing={2} width={300} sx={{ padding: "20px" }}>
        <TextField
          label={t("createRequestForm.requiredFields.name.label")}
          {...register("reagentName", {
            required: t(
              "createRequestForm.requiredFields.name.requiredMessage"
            ),
          })}
          helperText={errors.reagentName?.message}
          error={!!errors.reagentName}
        />
        <TextField
          label={t("createRequestForm.requiredFields.CASNumber.label")}
          {...register("CAS")}
        />
        <TextField
          type="number"
          label={t("createRequestForm.requiredFields.quantity.label")}
          {...register("desiredQuantity", {
            required: t(
              "createRequestForm.requiredFields.quantity.requiredMessage"
            ),
          })}
          helperText={errors.desiredQuantity?.message}
          error={!!errors.desiredQuantity}
        />
        <TextField
          label={t("createRequestForm.requiredFields.units.label")}
          {...register("unit", {
            required: t(
              "createRequestForm.requiredFields.units.requiredMessage"
            ),
          })}
          helperText={errors.unit?.message}
          error={!!errors.unit}
        />
        <TextField
          multiline
          rows={4}
          label={t("createRequestForm.requiredFields.comment.label")}
          {...register("userComment")}
        />
        <Box sx={{ display: "flex", gap: "5px", justifyContent: "end" }}>
          {isEdit ? (
            <Button type="submit" disabled={isLoading}>
              {t("buttons.edit")}
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading}>
              {t("buttons.create")}
            </Button>
          )}
          <Button onClick={onClose} disabled={isLoading}>
            {t("buttons.cancel")}
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default ReagentRequestForm;
