import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BasicModal } from "@/components";
import { Severity } from "@/hooks";
import { useDeclineReagentRequestMutation } from "@/store";
import { isFetchBaseQueryError } from "@/utils";

type DeclineReagentRequestProps = {
  id: string;
  modalOpen: boolean;
  onDeclineSubmit: (severity: Severity, errorMessage: string) => void;
  onClose: () => void;
};

type DeclineMessage = {
  declineComment: string;
};

const DeclineReagentRequest: React.FC<DeclineReagentRequestProps> = ({
  id,
  modalOpen,
  onDeclineSubmit,
  onClose,
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

  const [declineReagentRequest] = useDeclineReagentRequestMutation();

  const onSubmit = async (message: DeclineMessage) => {
    try {
      await declineReagentRequest({
        requestId: id,
        declineMessage: message.declineComment,
      }).unwrap();

      onDeclineSubmit("success", t("requests.successDecline"));
      onClose();
    } catch (error) {
      if (isFetchBaseQueryError(error) && error.data) {
        onDeclineSubmit("error", t(`backendErrors.${error.data}`));
      }
    }
  };

  return (
    <BasicModal
      title={t("requests.declineRequest.title")}
      isOpen={modalOpen}
      closeModal={onClose}
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
