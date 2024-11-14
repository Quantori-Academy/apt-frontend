import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LinkIcon from "@mui/icons-material/Link";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  ConfirmRemoving,
  EditableDetailRow,
  OrderAccordionButtons,
} from "@/components";
import { ORDER_STATUSES } from "@/constants";
import { Severity } from "@/hooks";
import {
  useDeleteReagentFromOrderMutation,
  useUpdateOrderReagentMutation,
} from "@/store";
import { OrderReagent, OrderStatus } from "@/types";

type OrderReagentRow = {
  label: string;
  key: keyof OrderReagent;
};

const OrderReagentMainRows: readonly OrderReagentRow[] = [
  { label: "name", key: "reagentName" },
  { label: "quantity", key: "quantity" },
  { label: "units", key: "unit" },
  { label: "price", key: "pricePerUnit" },
];

const OrderReagentSecondaryRows: readonly OrderReagentRow[] = [
  { label: "structure", key: "structure" },
  { label: "CASNumber", key: "CASNumber" },
  { label: "producer", key: "producer" },
  { label: "catalogID", key: "catalogId" },
];

type expand = string | false;

type OrderReagentDetailsProps = {
  orderId: string;
  reagent: OrderReagent;
  expanded: expand;
  status: OrderStatus;
  setExpanded: (value: expand) => void;
  openSnackbar: (severity: Severity, text: string) => void;
};

const OrderReagentDetails: React.FC<OrderReagentDetailsProps> = ({
  orderId,
  reagent,
  expanded,
  status,
  setExpanded,
  openSnackbar,
}) => {
  const { t } = useTranslation();

  const [isEditable, setIsEditable] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderReagent>({ mode: "onBlur" });

  const [updateOrderReagent] = useUpdateOrderReagentMutation();

  const [deleteReagentFromOrder] = useDeleteReagentFromOrderMutation();

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
    reset();
  };

  const handleDelete = async () => {
    try {
      await deleteReagentFromOrder({ orderId, reagentId: reagent.id }).unwrap();

      openSnackbar(
        "success",
        t("substanceDetails.snackBarMessages.reagent.successDelete")
      );
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
      setDeleteModalIsOpen(false);
    }
  };

  const onSubmit = async (data: OrderReagent) => {
    try {
      await updateOrderReagent({
        orderId: orderId,
        ...data,
        id: reagent.id,
      }).unwrap();
      openSnackbar(
        "success",
        t("substanceDetails.snackBarMessages.reagent.successUpdate")
      );
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
      setIsEditable(false);
      reset();
    }
  };
  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Accordion
        sx={{
          boxShadow: `0px -1px 1px #00695f, 0px 1px 3px #00695f`,
          marginBottom: 2,
        }}
        expanded={expanded === reagent.reagentName + reagent.quantity}
        onChange={handleChange(reagent.reagentName + reagent.quantity)}
        key={reagent.id}
      >
        <AccordionSummary
          id={`${reagent.reagentName + reagent.quantity}`}
          expandIcon={<ArrowDropDownIcon />}
        >
          {t("substances.filters.options.Reagent")}: {reagent.reagentName}
        </AccordionSummary>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {OrderReagentMainRows.map(({ label, key }) => (
                    <EditableDetailRow
                      key={key}
                      label={t(`substanceDetails.fields.${label}`)}
                      value={reagent[key as keyof OrderReagent]}
                      register={register}
                      errors={errors}
                      isEditable={isEditable}
                      fieldName={key}
                      TextFieldType={
                        key === "pricePerUnit" || key === "quantity"
                          ? "number"
                          : "text"
                      }
                      requiredMessage={t(
                        `createOrderForm.requiredFields.${label}.requiredMessage`
                      )}
                      requiredFields
                    />
                  ))}
                  {OrderReagentSecondaryRows.map(({ label, key }) => (
                    <EditableDetailRow
                      key={key}
                      label={t(`substanceDetails.fields.${label}`)}
                      value={reagent[key as keyof OrderReagent]}
                      register={register}
                      isEditable={isEditable}
                      fieldName={key}
                    />
                  ))}
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">
                        {t("substanceDetails.fields.catalogLink")}:
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {isEditable ? (
                        <TextField
                          size="small"
                          {...register("catalogLink")}
                          defaultValue={reagent.catalogLink}
                          error={!!errors.catalogLink}
                          helperText={errors.catalogLink?.message}
                          variant="outlined"
                        />
                      ) : reagent.catalogLink ? (
                        <Link
                          href={reagent.catalogLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <LinkIcon sx={{ mr: 1 }} />{" "}
                          {t(
                            "addSubstanceForm.requiredFields.catalogLink.label"
                          )}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
          {status === ORDER_STATUSES.Pending && (
            <AccordionActions sx={{ padding: "0px 16px 16px" }}>
              <OrderAccordionButtons
                isEditable={isEditable}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onDelete={() => setDeleteModalIsOpen(true)}
              />
            </AccordionActions>
          )}
        </Box>
      </Accordion>
      <ConfirmRemoving
        open={deleteModalIsOpen}
        modalTitle=""
        modalText={t("substances.modalMessages.confirmDelete")}
        onClose={() => setDeleteModalIsOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
};
export default OrderReagentDetails;
