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
import { useTranslation } from "react-i18next";

import { OrderInput } from "@/types";

type AddOrderProps = {
  modalOpen: boolean;
  onClose: () => void;
};

const AddOrder: React.FC<AddOrderProps> = ({ modalOpen, onClose }) => {
  const { t } = useTranslation();

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
      required: t("createOrderForm.errors.noReagentsOrder"),
    },
  });

  const onSubmit: SubmitHandler<OrderInput> = (data) => {
    console.log(data);
    onClose();
    reset();
  };

  return (
    <Dialog open={modalOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("orders.buttons.createOrder")}</DialogTitle>
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
              label={t("createOrderForm.requiredFields.title.label")}
              {...register("title", {
                required: t(
                  "createOrderForm.requiredFields.title.requiredMessage"
                ),
                maxLength: {
                  value: 200,
                  message: t(
                    "createOrderForm.requiredFields.title.maxLengthMessage"
                  ),
                },
              })}
              fullWidth
              helperText={errors.title?.message}
              error={!!errors.title}
            />
            <TextField
              label={t("createOrderForm.requiredFields.seller.label")}
              {...register("seller", {
                required: t(
                  "createOrderForm.requiredFields.seller.requiredMessage"
                ),
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
              {t("substances.buttons.addReagent")}
            </Button>
            <Button type="submit">{t("buttons.create")}</Button>
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
                  {`${t("substances.filters.options.Reagent")} №${arr.length - index}`}
                </Box>
              </Divider>
              <TextField
                label={t("createOrderForm.requiredFields.name.label")}
                {...register(`orderReagents.${index}.name`, {
                  required: t(
                    "createOrderForm.requiredFields.name.requiredMessage"
                  ),
                })}
                helperText={errors.orderReagents?.[index]?.name?.message}
                error={!!errors.orderReagents?.[index]?.name}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label={t("createOrderForm.requiredFields.units.label")}
                  fullWidth
                  {...register(`orderReagents.${index}.units`, {
                    required: t(
                      "createOrderForm.requiredFields.units.requiredMessage"
                    ),
                  })}
                  helperText={errors.orderReagents?.[index]?.units?.message}
                  error={!!errors.orderReagents?.[index]?.units}
                />
                <TextField
                  label={t("createOrderForm.requiredFields.quantity.label")}
                  fullWidth
                  inputProps={{ min: 0 }}
                  type="number"
                  {...register(`orderReagents.${index}.quantity`, {
                    required: t(
                      "createOrderForm.requiredFields.quantity.requiredMessage"
                    ),
                  })}
                  helperText={errors.orderReagents?.[index]?.quantity?.message}
                  error={!!errors.orderReagents?.[index]?.quantity}
                />
                <TextField
                  label={t("createOrderForm.requiredFields.price.label")}
                  fullWidth
                  inputProps={{ min: 0 }}
                  type="number"
                  {...register(`orderReagents.${index}.price`, {
                    required: t(
                      "createOrderForm.requiredFields.price.requiredMessage"
                    ),
                  })}
                  helperText={errors.orderReagents?.[index]?.price?.message}
                  error={!!errors.orderReagents?.[index]?.price}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label={t("addSubstanceForm.requiredFields.CASNumber.label")}
                  fullWidth
                  {...register(`orderReagents.${index}.CAS`)}
                />
                <TextField
                  label={t("addSubstanceForm.requiredFields.producer.label")}
                  fullWidth
                  {...register(`orderReagents.${index}.producer`)}
                />
              </Box>
              <TextField
                label={t("addSubstanceForm.requiredFields.structure.label")}
                fullWidth
                {...register(`orderReagents.${index}.structure`)}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label={t("addSubstanceForm.requiredFields.catalogLink.label")}
                  fullWidth
                  sx={{ flex: "1" }}
                  {...register(`orderReagents.${index}.catalogLink`)}
                />
                <TextField
                  label={t("addSubstanceForm.requiredFields.catalogId.label")}
                  fullWidth
                  sx={{ flex: "0 0 20%" }}
                  {...register(`orderReagents.${index}.catalogId`)}
                />
              </Box>
              <Button type="button" onClick={() => remove(index)}>
                {t("createOrderForm.buttons.removeReagentFromOrder")}
              </Button>
            </Stack>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrder;
