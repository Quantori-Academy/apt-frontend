import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { BasicModal } from "@/components";

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

  const onSubmit = async (newReagentRequest: ReagentRequestInput) => {
    //TODO: implement after backend ready
    console.log("am:", newReagentRequest);
    reset();
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
              required: "Quantity is required",
            })}
            helperText={errors.desiredQuantity?.message}
            error={!!errors.desiredQuantity}
          />
          <TextField
            label="Unit"
            {...register("unit", {
              required: "Unit is required",
            })}
            helperText={errors.unit?.message}
            error={!!errors.unit}
          />
          <TextField
            multiline
            rows={4}
            label="Comment"
            {...register("userComment")}
          />
          <Box sx={{ display: "flex", gap: "5px", justifyContent: "end" }}>
            <Button type="submit">Submit</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Box>
        </Stack>
      </form>
    </BasicModal>
  );
};

export default AddReagentRequest;
