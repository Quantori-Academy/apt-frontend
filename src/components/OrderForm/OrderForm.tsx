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

type OrderFormProps = {
  modalOpen: boolean;
  onClose: () => void;
  initialValues: OrderInput;
  onSubmit: SubmitHandler<OrderInput>;
  isLoading?: boolean;
  orderCreation?: boolean;
};

const OrderForm: React.FC<OrderFormProps> = ({
  modalOpen,
  onClose,
  initialValues,
  onSubmit,
  isLoading,
  orderCreation = true,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderInput>({
    mode: "onBlur",
    defaultValues: initialValues,
  });

  const { fields, prepend, remove } = useFieldArray({
    name: "reagents",
    control,
    rules: {
      required: t("createOrderForm.errors.noReagentsOrder"),
    },
  });

  return (
    <Dialog open={modalOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {orderCreation
          ? t("orders.buttons.createOrder")
          : t("createOrderForm.title")}
      </DialogTitle>
      <DialogContent
        sx={{
          "&.MuiDialogContent-root": {
            paddingTop: "10px",
          },
        }}
      >
        <Box onSubmit={handleSubmit(onSubmit)} component="form">
          {orderCreation && (
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
          )}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              type="button"
              onClick={() =>
                prepend({
                  reagentName: "",
                  unit: "",
                  quantity: "",
                  pricePerUnit: "",
                  structure: "",
                  CASNumber: "",
                  producer: "",
                  catalogId: "",
                  catalogLink: "",
                })
              }
            >
              {t("substances.buttons.addReagent")}
            </Button>
            <Button disabled={isLoading} type="submit">
              {orderCreation ? t("buttons.create") : t("buttons.save")}
            </Button>
          </Box>
          <FormHelperText error sx={{ mt: 1, fontSize: 14 }}>
            {errors.reagents?.root?.message}
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
                {...register(`reagents.${index}.reagentName`, {
                  required: t(
                    "createOrderForm.requiredFields.name.requiredMessage"
                  ),
                })}
                helperText={errors.reagents?.[index]?.reagentName?.message}
                error={!!errors.reagents?.[index]?.reagentName}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label={t("createOrderForm.requiredFields.units.label")}
                  fullWidth
                  {...register(`reagents.${index}.unit`, {
                    required: t(
                      "createOrderForm.requiredFields.units.requiredMessage"
                    ),
                  })}
                  helperText={errors.reagents?.[index]?.unit?.message}
                  error={!!errors.reagents?.[index]?.unit}
                />
                <TextField
                  label={t("createOrderForm.requiredFields.quantity.label")}
                  fullWidth
                  inputProps={{ min: 0 }}
                  type="number"
                  {...register(`reagents.${index}.quantity`, {
                    required: t(
                      "createOrderForm.requiredFields.quantity.requiredMessage"
                    ),
                  })}
                  helperText={errors.reagents?.[index]?.quantity?.message}
                  error={!!errors.reagents?.[index]?.quantity}
                />
                <TextField
                  label={t("createOrderForm.requiredFields.price.label")}
                  fullWidth
                  inputProps={{ min: 0 }}
                  type="number"
                  {...register(`reagents.${index}.pricePerUnit`, {
                    required: t(
                      "createOrderForm.requiredFields.price.requiredMessage"
                    ),
                  })}
                  helperText={errors.reagents?.[index]?.pricePerUnit?.message}
                  error={!!errors.reagents?.[index]?.pricePerUnit}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label={t("addSubstanceForm.requiredFields.CASNumber.label")}
                  fullWidth
                  {...register(`reagents.${index}.CASNumber`)}
                />
                <TextField
                  label={t("addSubstanceForm.requiredFields.producer.label")}
                  fullWidth
                  {...register(`reagents.${index}.producer`)}
                />
              </Box>
              <TextField
                label={t("addSubstanceForm.requiredFields.structure.label")}
                fullWidth
                {...register(`reagents.${index}.structure`)}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label={t("addSubstanceForm.requiredFields.catalogLink.label")}
                  fullWidth
                  sx={{ flex: "1" }}
                  {...register(`reagents.${index}.catalogLink`)}
                />
                <TextField
                  label={t("addSubstanceForm.requiredFields.catalogId.label")}
                  fullWidth
                  sx={{ flex: "0 0 20%" }}
                  {...register(`reagents.${index}.catalogId`)}
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

export default OrderForm;
