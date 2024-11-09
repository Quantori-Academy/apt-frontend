import { Button } from "@mui/material";

import { ORDER_STATUSES } from "@/constants";
import { OrderStatus } from "@/types";

type OrderActionButtonsProps = {
  editText: string;
  updateText: string;
  chooseLocationText: string;
  onClickEdit: () => void;
  onClickUpdate: () => void;
  onClickChooseLocation: () => void;
  status: OrderStatus;
};

const OrderActionButtons: React.FC<OrderActionButtonsProps> = ({
  editText,
  updateText,
  chooseLocationText,
  onClickEdit,
  onClickUpdate,
  onClickChooseLocation,
  status,
}) => {
  return (
    <>
      <Button
        disabled={status !== ORDER_STATUSES.Pending}
        type="button"
        onClick={onClickEdit}
      >
        {editText}
      </Button>
      {
        <Button
          disabled={
            status === ORDER_STATUSES.Cancelled ||
            status === ORDER_STATUSES.Fulfilled
          }
          type="button"
          onClick={onClickUpdate}
        >
          {updateText}
        </Button>
      }
      {status === ORDER_STATUSES.Submitted && (
        <Button type="button" onClick={onClickChooseLocation}>
          {chooseLocationText}
        </Button>
      )}
    </>
  );
};

export default OrderActionButtons;
