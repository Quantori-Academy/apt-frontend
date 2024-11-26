import {
  Add,
  ExpandLess,
  ExpandMore,
  ModeEditOutlineOutlined,
  MoveUp,
  Save,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  AddReagentsToOrder,
  BasicModal,
  ChooseReagentsLocationForm,
  DashboardBreadcrumbs,
  DetailItem,
  EditableRow,
  OrderReagentDetails,
  PageError,
  PageLoader,
} from "@/components";
import { ORDER_STATUSES } from "@/constants";
import { useAlertSnackbar } from "@/hooks";
import {
  useEditOrderTitleSellerMutation,
  useGetOrderQuery, // useUpdateOrderStatusMutation,
} from "@/store";
import {
  Order,
  /*StatusForm*/
} from "@/types";
import { formatDate } from "@/utils";

const OrderPage: React.FC = () => {
  const { t } = useTranslation();

  const { id: orderId } = useParams<{ id: string }>();

  const [isEditable, setIsEditable] = useState(false);
  // const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAddingReagents, setIsAddingReagents] = useState(false);
  const [isChoosingLocation, setIsChoosingLocation] = useState(false);

  const [isInfoOpened, setIsInfoOpened] = useState(true);
  const [reagentsListIsOpened, setReagentsListIsOpened] = useState(true);

  const {
    handleSubmit: handleSubmitEditing,
    formState: { errors },
    control,
    reset: resetEditing,
  } = useForm<Omit<Order, "status">>({ mode: "onBlur" });

  // const { handleSubmit: handleSubmitUpdating, reset: resetUpdating } =
  //   useForm<StatusForm>({ mode: "onBlur" });

  const {
    data: order,
    isLoading: isOrderLoading,
    isError,
  } = useGetOrderQuery(orderId ? orderId : skipToken);

  const { showSuccess, showError } = useAlertSnackbar();

  const [editOrderTitleSeller] = useEditOrderTitleSellerMutation();

  // const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (isOrderLoading) {
    return <PageLoader />;
  }

  if (!order || !orderId || isError) {
    return <PageError text={t("orders.errors.detailedOrderError")} />;
  }

  const handleEditClick = () => {
    setIsInfoOpened(true);
    setIsEditable(true);
  };

  const handleOrderInformationExpanding = () => {
    setIsInfoOpened((prev) => !prev);
    setIsEditable(false);
    resetEditing({ title: order.title, seller: order.seller });
  };

  const onSubmitEditing = async (data: Pick<Order, "title" | "seller">) => {
    const { error } = await editOrderTitleSeller({
      orderId: order.id,
      title: data.title === order.title ? null : data.title,
      seller: data.seller,
    });

    if (error && "message" in error) {
      resetEditing({ title: order.title, seller: order.seller });
      showError(t(`orders.snackBarMessages.${error.message}`));
    } else {
      showSuccess(t("orders.snackBarMessages.editing.success"));
    }
    setIsEditable(false);
  };

  // const onSubmitUpdatingStatus = async (data: StatusForm) => {
  //   const { error } = await updateOrderStatus({
  //     orderId: order.id,
  //     status: data,
  //   });

  //   if (error && "message" in error) {
  //     showError(t(`orders.snackBarMessages.${error.message}`));
  //   } else {
  //     showSuccess(t("orders.snackBarMessages.editing.success"));
  //   }
  //   setIsUpdatingStatus(false);
  //   resetUpdating();
  // };

  return (
    <>
      <DashboardBreadcrumbs />
      <Box mb={2}>
        <Typography variant="h4">
          {t("orders.title.Order")}: {order.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {t(`orders.table.Status`)}:{" "}
          <span>{t(`orders.statuses.${order.status}`)}</span>
        </Typography>
      </Box>
      <Divider />
      <Box
        pt={3}
        component="form"
        onSubmit={handleSubmitEditing(onSubmitEditing)}
      >
        <Box mb={2}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleOrderInformationExpanding}>
              {isInfoOpened ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Typography variant="h6">
              {t("orders.title.OrderInformation")}
            </Typography>
            {order.status === ORDER_STATUSES.Pending && (
              <IconButton
                key={String(isEditable)}
                type={isEditable ? "submit" : "button"}
                onClick={isEditable ? undefined : handleEditClick}
              >
                {isEditable ? <Save /> : <ModeEditOutlineOutlined />}
              </IconButton>
            )}
          </Box>
          <Collapse in={isInfoOpened}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mt: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <EditableRow
                label={t(`orders.table.Title`)}
                fieldName="title"
                value={order.title}
                rules={{
                  required: t(
                    "createOrderForm.requiredFields.title.maxLengthMessage"
                  ),
                  maxLength: {
                    value: 200,
                    message: t(
                      "createOrderForm.requiredFields.title.maxLengthMessage"
                    ),
                  },
                }}
                isEditable={isEditable}
                errors={errors}
                control={control}
              />
              <EditableRow
                label={t(`orders.table.Seller`)}
                fieldName="seller"
                value={order.seller}
                isEditable={isEditable}
                control={control}
              />
              <DetailItem
                label={t(`orders.table.Creation Date`)}
                value={formatDate(order.createdAt)}
              />
              <DetailItem
                label={t(`orders.table.Modified Date`)}
                value={formatDate(order.modifiedAt)}
              />
            </Paper>
          </Collapse>
        </Box>
      </Box>
      {isAddingReagents && (
        <AddReagentsToOrder
          orderId={order.id}
          isOpen={isAddingReagents}
          onClose={() => setIsAddingReagents(false)}
        />
      )}
      {isChoosingLocation && (
        <BasicModal
          title={t("orders.buttons.chooseLocation")}
          isOpen={isChoosingLocation}
          closeModal={() => setIsChoosingLocation(false)}
        >
          <ChooseReagentsLocationForm
            orderId={order.id}
            onClose={() => setIsChoosingLocation(false)}
          />
        </BasicModal>
      )}
      <Box mt={2}>
        <Box mt={2}>
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={() => setReagentsListIsOpened(!reagentsListIsOpened)}
            >
              {reagentsListIsOpened ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Box
              mt={2}
              mb={2}
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Typography variant="h6">{t("orders.title.Reagents")}</Typography>
              <Button
                sx={{
                  paddingLeft: "5px",
                  paddingRight: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "14px",
                }}
                onClick={() => setIsAddingReagents(true)}
              >
                <Add /> {t("orders.buttons.addReagents")}
              </Button>
              <Button
                sx={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                }}
                onClick={() => setIsChoosingLocation(true)}
              >
                <MoveUp /> {t("orders.buttons.allocateSelected")}
              </Button>
            </Box>
          </Box>
        </Box>
        <Collapse in={reagentsListIsOpened}>
          <OrderReagentDetails
            orderedReagents={order.orderedReagents}
            orderId={order.id}
            status={order.status}
          />
        </Collapse>
      </Box>
    </>
  );
};

export default OrderPage;
