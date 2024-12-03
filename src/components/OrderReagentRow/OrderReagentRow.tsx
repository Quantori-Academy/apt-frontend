import {
  ExpandLess,
  ExpandMore,
  Link as LinkIcon,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  Dialog,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EditController, OrderReagentButtons, SmilesImage } from "@/components";
import { ORDER_STATUSES } from "@/constants";
import { useAlertSnackbar } from "@/hooks";
import { useUpdateOrderReagentMutation } from "@/store";
import { OrderReagent, OrderReagentRowType, OrderStatus } from "@/types";
import { getValidationRules } from "@/utils";

type OrderReagentRowProps = {
  orderId: string;
  isEditable: boolean;
  showTableCell: boolean;
  status: OrderStatus;
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
  showTableCell,
  OrderReagentMainRows,
  OrderReagentSecondaryRows,
  selectedReagents,
  setEditableRowId,
  onDelete,
  onClickCheckbox,
}) => {
  const { t } = useTranslation();

  const { showSuccess, showError } = useAlertSnackbar();

  const [showSMILES, setShowSMILES] = useState(false);

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
    reset({
      ...reagent,
      catalogLink: reagent.catalogLink || "",
    });
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
      reset(data);
      setEditableRowId(null);
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        showError(errorMessage);
      } else {
        showError(t("substanceDetails.snackBarMessages.unexpectedError"));
      }
    }
  };

  const canSelectReagent =
    status === ORDER_STATUSES.Submitted && !reagent.isAllocated;
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
        {showTableCell && (
          <TableCell padding="checkbox">
            {canSelectReagent && (
              <Checkbox
                checked={selectedReagents.includes(reagent.id)}
                onChange={onClickCheckbox}
              />
            )}
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

          const isNumberType =
            key === "pricePerUnit" || key === "quantity" || key === "amount";

          return (
            <TableCell key={label}>
              {isEditable && key !== "fromRequest" ? (
                <EditController
                  value={value}
                  fieldName={key}
                  errors={errors}
                  control={control}
                  TextFieldType={isNumberType ? "number" : "text"}
                  rules={getValidationRules({ key, t })}
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
                    <TableCell align="center">
                      {t(`substanceDetails.fields.structure`)}
                    </TableCell>
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
                    <TableCell align="center">
                      {isEditable ? (
                        <TextField
                          size="small"
                          {...register("structure")}
                          defaultValue={reagent.structure}
                          error={!!errors.structure}
                          helperText={errors.structure?.message}
                          variant="outlined"
                        />
                      ) : reagent.structure ? (
                        <>
                          {reagent.structure}

                          <Tooltip placement="top" title="Show structure image">
                            <IconButton
                              size="small"
                              onClick={() => setShowSMILES(true)}
                            >
                              <VisibilityOutlined fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Dialog
                            open={showSMILES}
                            onClose={() => setShowSMILES(false)}
                          >
                            <SmilesImage
                              smiles={reagent.structure}
                              svgOptions={{ width: 200, height: 200 }}
                            />
                          </Dialog>
                        </>
                      ) : (
                        "-"
                      )}
                    </TableCell>
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
