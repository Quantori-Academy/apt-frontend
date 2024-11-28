import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BasicModal, StructureEditor } from "@/components";
import { ReagentRequestInput } from "@/types";

import style from "@/components/AddUserForm/AddUserForm.module.css";

type ReagentRequestFormProps = {
  isLoading: boolean;
  isEdit: boolean;
  onSubmit: (newReagentRequest: ReagentRequestInput) => void;
  onClose: () => void;
};

const ReagentRequestForm: React.FC<ReagentRequestFormProps> = ({
  isLoading,
  isEdit,
  onSubmit,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [smile, setSmile] = useState("");
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ReagentRequestInput>();

  const handleStructureDone = () => {
    setIsOpen(false);
    setValue("structure", smile);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Stack spacing={2} width={300} sx={{ padding: "10px" }}>
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
          InputLabelProps={{
            shrink: true,
          }}
          label={t("createRequestForm.requiredFields.structure.label")}
          {...register("structure")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Click To Draw Structure">
                  <IconButton edge="end" onClick={() => setIsOpen(true)}>
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <BasicModal
          title={""}
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        >
          <Box height="400px">
            <StructureEditor onChange={(smile) => setSmile(smile)} />
          </Box>
          <Box
            sx={{ margin: "4px", display: "flex", justifyContent: "flex-end" }}
          >
            <Button onClick={handleStructureDone}>Done</Button>
          </Box>
        </BasicModal>
        <Box display="flex" justifyContent="space-between" gap={1}>
          <TextField
            type="number"
            label={t("createRequestForm.requiredFields.initialQuantity.label")}
            {...register("initialQuantity", {
              required: t(
                "createRequestForm.requiredFields.initialQuantity.requiredMessage"
              ),
              validate: (value) =>
                value > 0 ||
                t(
                  "createRequestForm.requiredFields.initialQuantity.errorMessage"
                ),
            })}
            helperText={errors.initialQuantity?.message}
            error={!!errors.initialQuantity}
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
        </Box>

        <TextField
          type="number"
          label={t("createRequestForm.requiredFields.amount.label")}
          {...register("amount", {
            required: t(
              "createRequestForm.requiredFields.amount.requiredMessage"
            ),
            validate: (value) =>
              value > 0 ||
              t("createRequestForm.requiredFields.amount.errorMessage"),
          })}
          helperText={errors.initialQuantity?.message}
          error={!!errors.initialQuantity}
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
              {t("buttons.save")}
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
