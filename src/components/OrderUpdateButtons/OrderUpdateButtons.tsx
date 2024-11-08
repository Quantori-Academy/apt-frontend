import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { OrderActionButtons, SaveCancelButtons } from "@/components";
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
        <SaveCancelButtons
          key="editOrder"
          saveText={t("buttons.save")}
          cancelText={t("buttons.cancel")}
          onClickCancel={onCancelEditable}
        />
      ) : isUpdatingStatus ? (
        <SaveCancelButtons
          key="editOrder"
          saveText={t("buttons.save")}
          cancelText={t("buttons.cancel")}
          onClickCancel={onCancelUpdating}
        />
      ) : (
        <OrderActionButtons
          editText={t("buttons.edit")}
          updateText={t("orders.buttons.updateStatus")}
          chooseLocationText={t("orders.buttons.chooseLocation")}
          onClickEdit={onEdit}
          onClickUpdate={onUpdate}
          status={status}
        />
      )}
    </Stack>
  );
};

export default OrderUpdateButtons;
