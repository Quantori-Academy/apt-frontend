import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { BasicModal } from "@/components";

type DeclineReagentRequestProps = {
  onDeclineSubmit: (severity: "error" | "success") => void;
  onClose: () => void;
  id: number;
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
      title="Decline Reagent Request"
      closeModal={onClose}
      isOpen={modalOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <TextField
            label="Enter reason for decline"
            multiline
            variant="outlined"
            rows={4}
            {...register("declineComment", {
              required: "To decline request, comment is required",
            })}
            error={!!errors.declineComment}
            helperText={errors.declineComment?.message}
          />
          <Box sx={{ display: "flex", gap: "5px", justifyContent: "end" }}>
            <Button type="submit">Submit</Button>
            <Button onClick={() => onClose()}>Cancel</Button>
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default DeclineReagentRequest;
