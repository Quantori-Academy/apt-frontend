import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BasicModal } from "@/components";

type DeclineReagentRequestProps = {
  onDeclineSubmit: (severity: "error" | "success") => void;
  onClose: () => void;
  id: string;
  modalOpen: boolean;
};

type DeclineMessage = {
  declineComment: string;
};

const DeclineReagentRequest: React.FC<DeclineReagentRequestProps> = ({
  onDeclineSubmit,
  onClose,
  id,
  modalOpen,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeclineMessage>({
    defaultValues: {
      declineComment: "",
    },
  });

  const onSubmit = async (message: DeclineMessage) => {
    //TODO: waiting for the backend to use id and message
    console.log("am:", message);
    console.log("am:", id);
    onDeclineSubmit("success");
    onClose();
  };

  return (
    <BasicModal
      title={t("requests.declineRequest.title")}
      closeModal={onClose}
      isOpen={modalOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "18px",
          }}
        >
          <TextField
            label={t("requests.declineRequest.label")}
            multiline
            variant="outlined"
            rows={4}
            {...register("declineComment", {
              required: t("requests.declineRequest.requiredField"),
            })}
            error={!!errors.declineComment}
            helperText={errors.declineComment?.message}
          />
          <Box sx={{ display: "flex", gap: "5px", justifyContent: "end" }}>
            <Button type="submit">{t("buttons.submit")}</Button>
            <Button onClick={() => onClose()}>{t("buttons.cancel")}</Button>
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default DeclineReagentRequest;
