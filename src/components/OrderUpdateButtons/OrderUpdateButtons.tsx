import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { OrderActionButtons, SaveCancelButtons } from "@/components";
import { OrderStatus } from "@/types";

type OrderUpdateButtonsProps = {
  isEditable: boolean;
  isUpdatingStatus: boolean;
  status: OrderStatus;
  onEdit: () => void;
  onUpdate: () => void;
  onAdd: () => void;
  onCancelEditable: () => void;
  onCancelUpdating: () => void;
  onChooseLocation: () => void;
};

const OrderUpdateButtons: React.FC<OrderUpdateButtonsProps> = ({
  isEditable,
  isUpdatingStatus,
  status,
  onEdit,
  onUpdate,
  onAdd,
  onCancelEditable,
  onCancelUpdating,
  onChooseLocation,
}) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={1}>
      {isEditable ? (
        <SaveCancelButtons key="editOrder" onClickCancel={onCancelEditable} />
      ) : isUpdatingStatus ? (
        <SaveCancelButtons
          key="editOrderStatus"
          onClickCancel={onCancelUpdating}
        />
      ) : (
        <OrderActionButtons
          editText={t("buttons.edit")}
          updateText={t("orders.buttons.updateStatus")}
          addReagentText={t("orders.buttons.addReagents")}
          chooseLocationText={t("orders.buttons.chooseLocation")}
          status={status}
          onClickEdit={onEdit}
          onClickUpdate={onUpdate}
          onClickAddReagents={onAdd}
          onClickChooseLocation={onChooseLocation}
        />
      )}
    </Stack>
  );
};

export default OrderUpdateButtons;
