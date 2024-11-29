import { DoNotDisturb, LocalShipping } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ORDER_STATUSES, ORDER_STATUS_COLORS } from "@/constants";
import { OrderStatus } from "@/types";

type OrderStatusBoxProps = {
  status: OrderStatus;
  onClick: () => void;
};

const OrderStatusBox: React.FC<OrderStatusBoxProps> = ({ status, onClick }) => {
  const { t } = useTranslation();

  const statusCanBeUpdated =
    status === ORDER_STATUSES.Pending || status === ORDER_STATUSES.Submitted;

  return (
    <Box>
      <Typography variant="subtitle1" color="textSecondary">
        {t(`orders.table.Status`)}:{" "}
        <Typography
          component="span"
          sx={{
            color: ORDER_STATUS_COLORS[status],
            display: "inline",
          }}
        >
          {t(`orders.statuses.${status}`)}
        </Typography>
      </Typography>

      {statusCanBeUpdated && (
        <Button
          onClick={onClick}
          sx={{
            padding: "5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          {status === ORDER_STATUSES.Pending ? (
            <>
              <LocalShipping />
              {t("orders.buttons.markSubmitted")}
            </>
          ) : (
            <>
              <DoNotDisturb />
              {t("orders.buttons.markCancelled")}
            </>
          )}
        </Button>
      )}
    </Box>
  );
};

export default OrderStatusBox;
