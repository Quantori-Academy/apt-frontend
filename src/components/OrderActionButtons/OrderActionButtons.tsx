import { Button } from "@mui/material";

import { ORDER_STATUSES } from "@/constants";
import { OrderStatus } from "@/types";

type OrderActionButtonsProps = {
  editText: string;
  updateText: string;
  addReagentText: string;
  chooseLocationText: string;
  onClickEdit: () => void;
  onClickUpdate: () => void;
  onClickChooseLocation: () => void;
  onClickAddReagents: () => void;
  status: OrderStatus;
};

const OrderActionButtons: React.FC<OrderActionButtonsProps> = ({
  editText,
  updateText,
  addReagentText,
  chooseLocationText,
  onClickEdit,
  onClickUpdate,
  onClickAddReagents,
  onClickChooseLocation,
  status,
}) => {
  const canEdit = status === ORDER_STATUSES.Pending;
  const canUpdateStatus =
    status === ORDER_STATUSES.Pending || status === ORDER_STATUSES.Submitted;
  const canAllocate = status === ORDER_STATUSES.Submitted;

  return (
    <>
      <Button disabled={!canEdit} type="button" onClick={onClickEdit}>
        {editText}
      </Button>

      <Button disabled={!canUpdateStatus} type="button" onClick={onClickUpdate}>
        {updateText}
      </Button>

      <Button disabled={!canEdit} type="button" onClick={onClickAddReagents}>
        {addReagentText}
      </Button>

      {canAllocate && (
        <Button type="button" onClick={onClickChooseLocation}>
          {chooseLocationText}
        </Button>
      )}
    </>
  );
};

export default OrderActionButtons;
