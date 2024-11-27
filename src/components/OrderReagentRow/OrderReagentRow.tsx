import { ExpandLess, ExpandMore, Link as LinkIcon } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EditController, OrderReagentButtons } from "@/components";
import { ORDER_STATUSES } from "@/constants";
import { useAlertSnackbar } from "@/hooks";
import { useUpdateOrderReagentMutation } from "@/store";
import { OrderReagent, OrderReagentRowType, OrderStatus } from "@/types";

type OrderReagentRowProps = {
  orderId: string;
  status: OrderStatus;
  isEditable: boolean;
  reagent: OrderReagent;
  selectedReagents: number[];
  OrderReagentMainRows: readonly OrderReagentRowType[];
  OrderReagentSecondaryRows: readonly OrderReagentRowType[];
  setEditableRowId: React.Dispatch<React.SetStateAction<number | null>>;
  onDelete: (reagentId: number) => void;
  onClickCheckbox: () => void;
};

const OrderReagentRow: React.FC<OrderReagentRowProps> = ({
  orderId,
  status,
  isEditable,
  reagent,
  OrderReagentMainRows,
  OrderReagentSecondaryRows,
  selectedReagents,
  setEditableRowId,
  onDelete,
  onClickCheckbox,
}) => {
  const { t } = useTranslation();

  const { showSuccess, showError } = useAlertSnackbar();

  const [isRowOpened, setIsRowOpened] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<OrderReagent>({ mode: "onBlur" });

  const handleCancel = () => {
    setEditableRowId(null);
    reset();
  };

  const handleEditClick = (id: number) => {
    setEditableRowId((prevId: number | null) => (prevId === id ? null : id));
  };

  const [updateOrderReagent] = useUpdateOrderReagentMutation();

  const onSaveEditing = async (data: OrderReagent) => {
    try {
      await updateOrderReagent({
        orderId: orderId,
        reagent: {
          ...data,
          fromRequest: reagent.fromRequest,
          id: reagent.id,
        },
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
    }
    setEditableRowId(null);
    reset();
  };

  const canSelectReagent = status === ORDER_STATUSES.Submitted;
  const canEditReagent = status === ORDER_STATUSES.Pending;

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: isRowOpened && !isEditable ? "#0080801f" : "white",
        }}
      >
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setIsRowOpened((prev) => !prev)}
          >
            {isRowOpened ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
        {canSelectReagent && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={selectedReagents.includes(reagent.id)}
              onChange={onClickCheckbox}
            />
          </TableCell>
        )}
        {OrderReagentMainRows.map(({ label, key }) => {
          let value;
          if (reagent[key] === true) {
            value = "Yes";
          } else if (reagent[key] === false) {
            value = "No";
          } else {
            value = reagent[key];
          }

          return (
            <TableCell key={label}>
              {isEditable && key !== "fromRequest" ? (
                <EditController
                  value={value}
                  fieldName={key}
                  errors={errors}
                  control={control}
                  TextFieldType={
                    key === "pricePerUnit" || key === "quantity"
                      ? "number"
                      : "text"
                  }
                  rules={{
                    required: t(
                      `createOrderForm.requiredFields.${label}.requiredMessage`
                    ),
                  }}
                />
              ) : (
                value
              )}
            </TableCell>
          );
        })}
        {canEditReagent && (
          <TableCell align="center">
            <OrderReagentButtons
              isEditable={isEditable}
              onEdit={() => handleEditClick(reagent.id)}
              onSave={handleSubmit(onSaveEditing)}
              onCancel={handleCancel}
              onDelete={() => onDelete(reagent.id)}
            />
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell
          style={
            isRowOpened
              ? { paddingBottom: "20px", paddingTop: "20px" }
              : { paddingBottom: 0, paddingTop: 0 }
          }
          colSpan={OrderReagentMainRows.length + 3}
        >
          <Collapse in={isRowOpened} unmountOnExit>
            <Box m={1}>
              <Table
                sx={{
                  border: "1px solid #00808045",
                  borderCollapse: "collapse",
                }}
                size="small"
              >
                <TableHead>
                  <TableRow>
                    {OrderReagentSecondaryRows.map(({ label }) => (
                      <TableCell align="center" key={label}>
                        {t(`substanceDetails.fields.${label}`)}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      {t(`substanceDetails.fields.catalogLink`)}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderBottom: "1px solid #00808045",
                      },
                    }}
                  >
                    {OrderReagentSecondaryRows.map(({ key }) => (
                      <TableCell align="center" key={key}>
                        {isEditable ? (
                          <EditController
                            value={reagent[key]}
                            control={control}
                            fieldName={key}
                          />
                        ) : (
                          reagent[key] || "-"
                        )}
                      </TableCell>
                    ))}
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderReagentRow;
