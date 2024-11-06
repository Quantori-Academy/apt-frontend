import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  EditableDetailRow,
  OrderReagentDetails,
  OrderStatusRow,
  OrderUpdateButtons,
  PageError,
  PageLoader,
} from "@/components";
import { useAlertSnackbar } from "@/hooks";
import {
  useEditOrderTitleSellerMutation,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} from "@/store";
import { Order, StatusForm } from "@/types";
import { formatDate } from "@/utils";

type OrderRow = {
  label: string;
  key: keyof Order;
};

const OrderRows: readonly OrderRow[] = [
  { label: "Title", key: "title" },
  { label: "Seller", key: "seller" },
  { label: "Status", key: "status" },
  { label: "Creation Date", key: "createdAt" },
  { label: "Modified Date", key: "modifiedAt" },
];

const OrderPage: React.FC = () => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState<string | false>(false);

  const { id: orderId } = useParams<{ id: string }>();

  const [isEditable, setIsEditable] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const {
    register: registerEditing,
    handleSubmit: handleSubmitEditing,
    formState: { errors },
    reset: resetEditing,
  } = useForm<Omit<Order, "status">>({ mode: "onBlur" });

  const {
    register: registerUpdating,
    handleSubmit: handleSubmitUpdating,
    reset: resetUpdating,
  } = useForm<StatusForm>({ mode: "onBlur" });

  const {
    data: order,
    isLoading: isOrderLoading,
    isError,
  } = useGetOrderQuery(orderId ? orderId : skipToken);

  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const [editOrderTitleSeller] = useEditOrderTitleSellerMutation();

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (isOrderLoading) {
    return <PageLoader />;
  }

  if (!order || !orderId || isError) {
    return <PageError text={t("orders.errors.detailedOrderError")} />;
  }

  const handleCancelEdit = () => {
    setIsEditable(false);
    resetEditing();
  };

  const handleCancelUpdateStatus = () => {
    setIsUpdatingStatus(false);
    resetUpdating();
  };

  const onSubmitEditing = async (data: Pick<Order, "title" | "seller">) => {
    const { error } = await editOrderTitleSeller({
      orderId: order.id,
      ...data,
    });

    if (error && "message" in error) {
      openSnackbar("error", error.message as string);
    } else {
      openSnackbar("success", t("orders.snackBarMessages.editing.success"));
    }
    setIsEditable(false);
  };

  const onSubmitUpdatingStatus = async (data: StatusForm) => {
    const { error } = await updateOrderStatus({
      orderId: order.id,
      status: data,
    });

    if (error && "message" in error) {
      openSnackbar("error", error.message as string);
    } else {
      openSnackbar("success", t("orders.snackBarMessages.editing.success"));
    }
    setIsUpdatingStatus(false);
  };

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {t("orders.title.DetailPage")}
      </Typography>
      <Box
        component="form"
        onSubmit={
          isEditable
            ? handleSubmitEditing(onSubmitEditing)
            : handleSubmitUpdating(onSubmitUpdatingStatus)
        }
      >
        <Box display="flex" flexDirection="column" marginBottom={2}>
          <TableContainer sx={{ maxWidth: "350px" }} component={Paper}>
            <Table size="small">
              <TableBody>
                {OrderRows.map(({ label, key }) =>
                  key !== "status" ? (
                    <EditableDetailRow
                      key={key}
                      label={t(`orders.table.${label}`)}
                      value={
                        key === "createdAt" || key === "modifiedAt"
                          ? formatDate(order[key as keyof Order])
                          : order[key as keyof Order] || "-"
                      }
                      register={registerEditing}
                      errors={errors}
                      isEditable={
                        key === "seller" || key === "title" ? isEditable : false
                      }
                      fieldName={key}
                      requiredMessage={t(
                        `createOrderForm.requiredFields.${label}.requiredMessage`
                      )}
                      requiredFields
                    />
                  ) : (
                    <OrderStatusRow
                      key={key}
                      label={t("orders.table.Status")}
                      value={order[key as keyof Order]}
                      isUpdating={isUpdatingStatus}
                      register={registerUpdating}
                      currentStatus={order.status}
                    />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <OrderUpdateButtons
          status={order.status}
          isEditable={isEditable}
          isUpdatingStatus={isUpdatingStatus}
          onEdit={() => setIsEditable(true)}
          onUpdate={() => setIsUpdatingStatus(true)}
          onCancelEditable={handleCancelEdit}
          onCancelUpdating={handleCancelUpdateStatus}
        />
      </Box>
      <Divider style={{ margin: "16px 0" }} />
      {order.orderedReagents.map((reagent) => (
        <OrderReagentDetails
          key={reagent.id}
          reagent={reagent}
          expanded={expanded}
          setExpanded={setExpanded}
          orderId={order.id}
          openSnackbar={openSnackbar}
        />
      ))}
      {SnackbarComponent()}
    </>
  );
};

export default OrderPage;
