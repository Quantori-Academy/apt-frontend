import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormsLoadingBox, SaveCancelButtons } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useChangeQuantityMutation } from "@/store";
import { SubstancesCategory } from "@/types";
import { handleError, validateQuantity } from "@/utils";

type QuantityChangingProps = {
  storageContentId: number;
  substanceType: SubstancesCategory;
  currentQuantity: string;
  onCancel: () => void;
};

type NewQuantity = { newQuantity: string };

const SubstanceQuantityChangingForm: React.FC<QuantityChangingProps> = ({
  storageContentId,
  substanceType,
  currentQuantity,
  onCancel,
}) => {
  const { t } = useTranslation();

  const { showSuccess, showError } = useAlertSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewQuantity>({
    mode: "onChange",
    defaultValues: {
      newQuantity: "",
    },
  });

  const [changeQuantity, { isLoading }] = useChangeQuantityMutation();

  if (isLoading) {
    return <FormsLoadingBox />;
  }

  const onSubmit = async (data: NewQuantity) => {
    const lowerCaseType = substanceType.toLowerCase();
    try {
      await changeQuantity({
        storageContentId,
        newQuantity: data.newQuantity,
      }).unwrap();

      showSuccess(
        t(`substanceDetails.snackBarMessages.${lowerCaseType}.successUpdate`)
      );
      onCancel();
    } catch (error) {
      handleError({ error, t, showError });
    }
  };

  return (
    <Dialog open onClose={onCancel} maxWidth="xs">
      <DialogTitle>
        {t(
          `substanceDetails.title.${substanceType === "Reagent" ? "editReagent" : "editSample"}`
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          "&.MuiDialogContent-root": {
            paddingTop: "10px",
          },
        }}
      >
        <Box onSubmit={handleSubmit(onSubmit)} component="form">
          <Controller
            name="newQuantity"
            control={control}
            rules={{
              required: t("substanceDetails.quantityValidation.required"),
              validate: (value) =>
                validateQuantity({ value, currentQuantity, t }),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("substanceDetails.fields.totalQuantityLeft")}
                variant="outlined"
                type="number"
                fullWidth
                error={!!errors.newQuantity}
                helperText={errors.newQuantity?.message}
                inputProps={{ min: 0, step: "any" }}
                sx={{
                  width: "300px",
                  marginBottom: "20px",
                  "& .MuiOutlinedInput-root.Mui-error": {
                    "& fieldset": {
                      borderColor: "#B8860B",
                    },
                  },
                  "& .MuiFormHelperText-root.Mui-error": {
                    color: "#B8860B",
                  },
                }}
              />
            )}
          />
          <SaveCancelButtons saveDisabled={!isValid} onClickCancel={onCancel} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SubstanceQuantityChangingForm;
