import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BasicModal } from "@/components";
import { useAddReagentRequestMutation } from "@/store";

import style from "@/components/AddUserForm/AddUserForm.module.css";

type ReagentRequestInput = {
  reagentName: string;
  CAS: string;
  desiredQuantity: number | null;
  userComment: string;
  unit: string;
};

type AddReagentRequestProps = {
  modalOpen: boolean;
  onClose: () => void;
};

const AddReagentRequest: React.FC<AddReagentRequestProps> = ({
  modalOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReagentRequestInput>({
    defaultValues: {
      reagentName: "",
      CAS: "",
      desiredQuantity: null,
      userComment: "",
      unit: "",
    },
  });
  const { t } = useTranslation();
  const [addReagentRequest] = useAddReagentRequestMutation();

  const onSubmit = async (newReagentRequest: ReagentRequestInput) => {
    const { error } = await addReagentRequest(newReagentRequest);

    if (!error) {
      reset();
      onClose();
    }
  };

  return (
    <BasicModal
      title="Create Reagent request"
      closeModal={onClose}
      isOpen={modalOpen}
    >
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
            <Button type="submit">{t("buttons.create")}</Button>
            <Button onClick={onClose}>{t("buttons.cancel")}</Button>
          </Box>
        </Stack>
      </form>
    </BasicModal>
  );
};

export default AddReagentRequest;
