import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { BasicModal } from "@/components";

import style from "@/components/AddUserForm/AddUserForm.module.css";

type ReagentRequestInput = {
  reagentName: string;
  CAS: string;
  desiredQuantity: number;
  userComment: string;
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
    formState: { errors },
  } = useForm<ReagentRequestInput>({
    defaultValues: {
      reagentName: "",
      CAS: "",
      desiredQuantity: 0,
      userComment: "",
    },
  });

  const onSubmit = async (newReagentRequest: ReagentRequestInput) => {
    console.log("am:", newReagentRequest);
    onClose();
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
            label="Reagent Name"
            {...register("reagentName", {
              required: "Reagent Name is required",
            })}
            helperText={errors.reagentName?.message}
            error={!!errors.reagentName}
          />
          <TextField label="CAS number" {...register("CAS")} />
          <TextField
            label="Desired Quantity"
            {...register("desiredQuantity", {
              required: "Desired Quantity is required",
            })}
            helperText={errors.desiredQuantity?.message}
            error={!!errors.desiredQuantity}
          />
          <TextField
            multiline
            rows={4}
            label="Comment"
            {...register("userComment")}
          />
          <Box>
            <Button type="submit">Submit</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Box>
        </Stack>
      </form>
    </BasicModal>
  );
};

export default AddReagentRequest;
