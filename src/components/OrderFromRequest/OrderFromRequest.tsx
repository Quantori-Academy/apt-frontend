import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Severity } from "@/hooks";
import { useCreateOrderFromRequestsMutation } from "@/store";
import { OrderInput, ReagentRequests } from "@/types";

type AddOrderProps = {
  modalOpen: boolean;
  onClose: () => void;
  openSnackbar: (severity: Severity, text: string) => void;
  requests: ReagentRequests;
  onCreateOrder: () => void;
};

const OrderFromRequest: React.FC<AddOrderProps> = ({
  modalOpen,
  onClose,
  openSnackbar,
  requests,
  onCreateOrder,
}) => {
  const { t } = useTranslation();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<OrderInput>({
    defaultValues: {
      title: "",
      seller: "",
      reagents: requests.map((request) => {
        const [reagentQuantity, reagentUnit] =
          request.desiredQuantity.split(" ");
        return {
          reagentName: request.name || "",
          unit: reagentUnit || "",
          quantity: reagentQuantity || "",
          pricePerUnit: "",
          structure: request.structure || "",
          CASNumber: request.CAS || "",
          producer: "",
          catalogId: "",
          catalogLink: "",
        };
      }),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "reagents",
  });
  console.log(fields, "fields");
  const [createOrderFromRequests] = useCreateOrderFromRequestsMutation();

  const onSubmit: SubmitHandler<OrderInput> = async (data) => {
    try {
      await createOrderFromRequests({
        requestId: requests[0].id,
        ...data,
      }).unwrap();
      openSnackbar(
        "success",
        t("createOrderForm.snackBarMessages.creation.success")
      );
      onClose();
      reset();
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        openSnackbar("error", errorMessage);
      } else {
        openSnackbar(
          "error",
          t("substanceDetails.snackBarMessages.unexpectedError")
        );
      }
    } finally {
      onCreateOrder();
    }
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

          <Button type="submit">{t("buttons.create")}</Button>

          {fields.map((field, index, arr) => {
            return (
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
                    label={t(
                      "addSubstanceForm.requiredFields.catalogLink.label"
                    )}
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
              </Stack>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFromRequest;