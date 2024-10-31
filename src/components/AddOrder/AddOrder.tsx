import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { OrderInput } from "@/types";

type AddOrderProps = {
  modalOpen: boolean;
  onClose: () => void;
};

const AddOrder: React.FC<AddOrderProps> = ({ modalOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<OrderInput>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      seller: "",
      orderReagents: [
        {
          name: "",
          units: "",
          quantity: "",
          price: "",
          structure: "",
          CAS: "",
          producer: "",
          catalogId: "",
          catalogLink: "",
        },
      ],
    },
  });

  const { fields, prepend, remove } = useFieldArray({
    name: "orderReagents",
    control,
    rules: {
      required: "Add at least 1 reagent to the order",
    },
  });

  const onSubmit: SubmitHandler<OrderInput> = (data) => {
    console.log(data);
    onClose();
    reset();
  };

  return (
    <Dialog open={modalOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Order</DialogTitle>
      <DialogContent
        sx={{
          "&.MuiDialogContent-root": {
            paddingTop: "10px",
          },
        }}
      >
        <Box onSubmit={handleSubmit(onSubmit)} component="form">
          <Stack spacing={3} mb={3}>
            <TextField
              label="Title*"
              {...register("title", {
                required: "Order required",
                maxLength: {
                  value: 200,
                  message: "Title cannot exceed 200 characters",
                },
              })}
              fullWidth
              helperText={errors.title?.message}
              error={!!errors.title}
            />
            <TextField
              label="Seller*"
              {...register("seller", {
                required: "Seller required",
              })}
              fullWidth
              helperText={errors.seller?.message}
              error={!!errors.seller}
            />
          </Stack>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              type="button"
              onClick={() =>
                prepend({
                  name: "",
                  units: "",
                  quantity: "",
                  price: "",
                  structure: "",
                  CAS: "",
                  producer: "",
                  catalogId: "",
                  catalogLink: "",
                })
              }
            >
              Add Reagent
            </Button>
            <Button type="submit">Submit</Button>
          </Box>
          <FormHelperText error sx={{ mt: 1, fontSize: 14 }}>
            {errors.orderReagents?.root?.message}
          </FormHelperText>
          {fields.map((field, index, arr) => (
            <Stack spacing={3} mt={5} mb={3} key={field.id}>
              <Divider>
                <Box
                  sx={{
                    display: "inline-block",
                    padding: "6px 12px",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#004d40",
                    borderRadius: "16px",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  {`Reagent №${arr.length - index}`}
                </Box>
              </Divider>
              <TextField
                label="Name*"
                {...register(`orderReagents.${index}.name`, {
                  required: "Name required",
                })}
                helperText={errors.orderReagents?.[index]?.name?.message}
                error={!!errors.orderReagents?.[index]?.name}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Units*"
                  fullWidth
                  {...register(`orderReagents.${index}.units`, {
                    required: "Units required",
                  })}
                  helperText={errors.orderReagents?.[index]?.units?.message}
                  error={!!errors.orderReagents?.[index]?.units}
                />
                <TextField
                  label="Quantity*"
                  fullWidth
                  inputProps={{ min: 0 }}
                  type="number"
                  {...register(`orderReagents.${index}.quantity`, {
                    required: "Quantity required",
                  })}
                  helperText={errors.orderReagents?.[index]?.quantity?.message}
                  error={!!errors.orderReagents?.[index]?.quantity}
                />
                <TextField
                  label="Price*"
                  fullWidth
                  inputProps={{ min: 0 }}
                  type="number"
                  {...register(`orderReagents.${index}.price`, {
                    required: "Price required",
                  })}
                  helperText={errors.orderReagents?.[index]?.price?.message}
                  error={!!errors.orderReagents?.[index]?.price}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="CAS"
                  fullWidth
                  {...register(`orderReagents.${index}.CAS`)}
                />
                <TextField
                  label="Producer"
                  fullWidth
                  {...register(`orderReagents.${index}.producer`)}
                />
              </Box>
              <TextField
                label="Structure"
                fullWidth
                {...register(`orderReagents.${index}.structure`)}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Catalog Link"
                  fullWidth
                  sx={{ flex: "1" }}
                  {...register(`orderReagents.${index}.catalogLink`)}
                />
                <TextField
                  label="Catalog Id"
                  fullWidth
                  sx={{ flex: "0 0 20%" }}
                  {...register(`orderReagents.${index}.catalogId`)}
                />
              </Box>
              <Button type="button" onClick={() => remove(index)}>
                Remove from order
              </Button>
            </Stack>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrder;
