import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ORDER_STATUSES } from "@/constants";
import { OrderStatus } from "@/types";

type OrderUpdateButtonsProps = {
  status: OrderStatus;
  isEditable: boolean;
  isUpdatingStatus: boolean;
  onEdit: () => void;
  onUpdate: () => void;
  onCancelEditable: () => void;
  onCancelUpdating: () => void;
};

const OrderUpdateButtons: React.FC<OrderUpdateButtonsProps> = ({
  status,
  isEditable,
  isUpdatingStatus,
  onEdit,
  onUpdate,
  onCancelEditable,
  onCancelUpdating,
}) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={1}>
      {isEditable ? (
        <>
          <Button key="submitEditing" type="submit">
            {t("buttons.save")}
          </Button>
          <Button key="cancelEditing" type="button" onClick={onCancelEditable}>
            {t("buttons.cancel")}
          </Button>
        </>
      ) : isUpdatingStatus ? (
        <>
          <Button key="submitUpdating" type="submit">
            {t("buttons.save")}
          </Button>
          <Button key="cancelUpdating" type="button" onClick={onCancelUpdating}>
            {t("buttons.cancel")}
          </Button>
        </>
      ) : (
        <>
          <Button key="edit" type="button" onClick={onEdit}>
            {t("buttons.edit")}
          </Button>
          <Button key="update" type="button" onClick={onUpdate}>
            {t("orders.buttons.updateStatus")}
          </Button>
          {status === ORDER_STATUSES.Fulfilled && (
            <Button type="button">{t("orders.buttons.chooseLocation")}</Button>
          )}
        </>
      )}
    </Stack>
  );
};

export default OrderUpdateButtons;
