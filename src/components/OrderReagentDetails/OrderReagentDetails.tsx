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
  Stack,
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
  DetailItem,
  EditableDetailRow,
  OrderAccordionButtons,
} from "@/components";
import { ORDER_STATUSES } from "@/constants";
import { useAlertSnackbar } from "@/hooks";
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

type OrderReagentDetailsProps = {
  orderId: string;
  reagent: OrderReagent;
  expandedFieldId: string;
  status: OrderStatus;
  setExpandedFieldId: (value: string) => void;
};

const OrderReagentDetails: React.FC<OrderReagentDetailsProps> = ({
  orderId,
  reagent,
  expandedFieldId,
  status,
  setExpandedFieldId,
}) => {
  const { t } = useTranslation();

  const [isEditable, setIsEditable] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const { showSuccess, showError } = useAlertSnackbar();

  const {
    register,
    handleSubmit,
    control,
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

      showSuccess(t("substanceDetails.snackBarMessages.reagent.successDelete"));
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        showError(errorMessage);
      } else {
        showError(t("substanceDetails.snackBarMessages.unexpectedError"));
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
      showSuccess(t("substanceDetails.snackBarMessages.reagent.successUpdate"));
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        showError(errorMessage);
      } else {
        showError(t("substanceDetails.snackBarMessages.unexpectedError"));
      }
    } finally {
      setIsEditable(false);
      reset();
    }
  };

  const isFieldExpanded = expandedFieldId === String(reagent.id);

  return (
    <>
      <Accordion
        sx={{
          boxShadow: `0px -1px 1px #00695f, 0px 1px 3px #00695f`,
          marginBottom: 2,
        }}
        expanded={isFieldExpanded}
        onChange={() =>
          setExpandedFieldId(isFieldExpanded ? "" : String(reagent.id))
        }
        key={reagent.id}
      >
        <AccordionSummary
          id={`${reagent.reagentName + reagent.quantity}`}
          expandIcon={<ArrowDropDownIcon />}
        >
          {!isFieldExpanded && (
            <Stack direction="row" spacing={2}>
              {OrderReagentMainRows.map(({ label, key }) => (
                <DetailItem
                  key={key}
                  label={t(`substanceDetails.fields.${label}`)}
                  value={reagent[key as keyof OrderReagent]}
                />
              ))}
            </Stack>
          )}
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
                      control={control}
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
                      control={control}
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
