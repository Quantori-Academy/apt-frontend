import { Delete as DeleteIcon } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { OrderInput } from "@/types";

type OrderFormProps = {
  modalOpen: boolean;
  initialValues: OrderInput;
  isLoading?: boolean;
  orderCreation?: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<OrderInput>;
};

const OrderForm: React.FC<OrderFormProps> = ({
  modalOpen,
  initialValues,
  isLoading,
  orderCreation = true,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const [expandedFieldId, setExpandedFieldId] = useState<string>("");

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
    <Dialog open={modalOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {orderCreation
          ? t("orders.buttons.createOrder")
          : t("createOrderForm.title.form")}
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
                marginBottom: "15px",
              }}
            >
              {t("createOrderForm.title.reagents")}
            </Box>
          </Divider>
          {fields.map((field, index) => (
            <Accordion
              key={field.id}
              sx={{
                border: "1px solid #ccc",
                margin: "0 ",
                "&.MuiAccordion-root": {
                  margin: 0,
                },
              }}
              square
              expanded={expandedFieldId === field.id}
              onChange={() =>
                setExpandedFieldId(expandedFieldId === field.id ? "" : field.id)
              }
            >
              <AccordionSummary
                id={field.id}
                expandIcon={<ArrowDropDownIcon />}
                sx={{
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Box
                  onClick={(event) => event.stopPropagation()}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    cursor: "default",
                  }}
                >
                  <TextField
                    fullWidth
                    label={t("createOrderForm.requiredFields.name.label")}
                    {...register(`reagents.${index}.reagentName`, {
                      required: t(
                        "createOrderForm.requiredFields.name.requiredMessage"
                      ),
                    })}
                    error={!!errors.reagents?.[index]?.reagentName}
                  />
                  <TextField
                    label={t("createOrderForm.requiredFields.units.label")}
                    fullWidth
                    {...register(`reagents.${index}.unit`, {
                      required: t(
                        "createOrderForm.requiredFields.units.requiredMessage"
                      ),
                    })}
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
                    error={!!errors.reagents?.[index]?.pricePerUnit}
                  />
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      remove(index);
                    }}
                    color="error"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      label={t(
                        "addSubstanceForm.requiredFields.CASNumber.label"
                      )}
                      fullWidth
                      {...register(`reagents.${index}.CASNumber`)}
                    />
                    <TextField
                      label={t(
                        "addSubstanceForm.requiredFields.producer.label"
                      )}
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
                      label={t(
                        "addSubstanceForm.requiredFields.catalogLink.label"
                      )}
                      fullWidth
                      sx={{ flex: "1" }}
                      {...register(`reagents.${index}.catalogLink`)}
                    />
                    <TextField
                      label={t(
                        "addSubstanceForm.requiredFields.catalogId.label"
                      )}
                      fullWidth
                      sx={{ flex: "0 0 20%" }}
                      {...register(`reagents.${index}.catalogId`)}
                    />
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
