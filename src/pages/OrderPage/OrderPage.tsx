import { Box, Divider, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  DetailItem,
  OrderReagentDetails,
  PageError,
  PageLoader,
} from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useGetOrderQuery } from "@/store";
import { Order } from "@/types";
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

  const {
    data: order,
    isLoading: isOrderLoading,
    isError,
  } = useGetOrderQuery(orderId ? orderId : skipToken);

  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  if (isOrderLoading) {
    return <PageLoader />;
  }

  if (!order || !orderId || isError) {
    return <PageError text={t("orders.errors.detailedOrderError")} />;
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {t("orders.title.DetailPage")}
      </Typography>
      <Box display="flex" flexDirection="column" marginBottom={2}>
        {OrderRows.map(({ label, key }) => (
          <DetailItem
            key={key}
            label={t(`orders.table.${label}`)}
            value={
              key === "createdAt" || key === "modifiedAt"
                ? formatDate(order[key as keyof Order])
                : key === "status"
                  ? t(`orders.statuses.${order[key as keyof Order]}`)
                  : order[key as keyof Order] || "-"
            }
          />
        ))}
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
