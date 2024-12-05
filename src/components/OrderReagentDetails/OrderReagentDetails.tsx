import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmRemoving, OrderReagentRow } from "@/components";
import { ORDER_STATUSES } from "@/constants";
import { useAlertSnackbar } from "@/hooks";
import { useDeleteReagentFromOrderMutation } from "@/store";
import { OrderReagent, OrderReagentRowType, OrderStatus } from "@/types";

const OrderReagentMainRows: readonly OrderReagentRowType[] = [
  { label: "name", key: "reagentName" },
  { label: "amount", key: "amount" },
  { label: "quantity", key: "quantity" },
  { label: "units", key: "unit" },
  { label: "price", key: "pricePerUnit" },
  { label: "fromRequest", key: "fromRequest" },
];

const OrderReagentSecondaryRows: readonly OrderReagentRowType[] = [
  { label: "CASNumber", key: "CASNumber" },
  { label: "producer", key: "producer" },
  { label: "catalogID", key: "catalogId" },
];

type OrderReagentDetailsProps = {
  orderId: string;
  orderedReagents: OrderReagent[];
  status: OrderStatus;
  selectedReagents: number[];
  setSelectedReagents: React.Dispatch<React.SetStateAction<number[]>>;
  setIsAllocateDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderReagentDetails: React.FC<OrderReagentDetailsProps> = ({
  orderId,
  orderedReagents,
  status,
  selectedReagents,
  setSelectedReagents,
  setIsAllocateDisabled,
}) => {
  const { t } = useTranslation();

  const { showSuccess, showError } = useAlertSnackbar();

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [reagentIdToDelete, setReagentIdToDelete] = useState<number | null>(
    null
  );

  const [editableRowId, setEditableRowId] = useState<number | null>(null);

  const [deleteReagentFromOrder] = useDeleteReagentFromOrderMutation();

  const notAllocatedReagents = orderedReagents
    .filter((reagent) => !reagent.isAllocated)
    .map((reagent) => reagent.id);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReagents(notAllocatedReagents);
      setIsAllocateDisabled(false);
    } else {
      setSelectedReagents([]);
      setIsAllocateDisabled(true);
    }
  };

  const handleCheckboxChange = (id: number) => {
    const selected = selectedReagents.includes(id)
      ? selectedReagents.filter((item) => item !== id)
      : [...selectedReagents, id];
    setEditableRowId(null);
    setSelectedReagents(selected);
    setIsAllocateDisabled(!selected.length);
  };

  const onDelete = (reagentId: number) => {
    setReagentIdToDelete(reagentId);
    setDeleteModalIsOpen(true);
  };

  const onCancelDelete = () => {
    setReagentIdToDelete(null);
    setDeleteModalIsOpen(false);
  };

  const handleDeleteRequest = async () => {
    try {
      await deleteReagentFromOrder({
        orderId,
        reagentId: reagentIdToDelete!,
      }).unwrap();

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

  const canSelectAll = status === ORDER_STATUSES.Submitted;
  const canEditReagent = status === ORDER_STATUSES.Pending;

  const notAllocatedReagentsAmount = notAllocatedReagents.length;
  const showTableCell = !!notAllocatedReagentsAmount && canSelectAll;

  return (
    <>
      <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 0 }} />
              {canSelectAll && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedReagents.length > 0 &&
                      selectedReagents.length < notAllocatedReagentsAmount
                    }
                    checked={
                      selectedReagents.length === notAllocatedReagentsAmount
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
              )}
              {OrderReagentMainRows.map(({ label }) => (
                <TableCell key={label}>
                  {t(`substanceDetails.fields.${label}`)}
                </TableCell>
              ))}
              {canEditReagent && (
                <TableCell align="center">{t("users.table.actions")}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedReagents.map((reagent) => (
              <OrderReagentRow
                key={reagent.id}
                orderId={orderId}
                status={status}
                isEditable={editableRowId === reagent.id}
                reagent={reagent}
                OrderReagentMainRows={OrderReagentMainRows}
                OrderReagentSecondaryRows={OrderReagentSecondaryRows}
                selectedReagents={selectedReagents}
                showTableCell={showTableCell}
                setEditableRowId={setEditableRowId}
                onClickCheckbox={() => handleCheckboxChange(reagent.id)}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmRemoving
        open={deleteModalIsOpen}
        modalTitle=""
        modalText={t("substances.modalMessages.confirmDelete")}
        onClose={onCancelDelete}
        onDelete={handleDeleteRequest}
      />
    </>
  );
};

export default OrderReagentDetails;
