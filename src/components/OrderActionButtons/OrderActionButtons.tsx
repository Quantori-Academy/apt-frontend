import { Button } from "@mui/material";

import { ORDER_STATUSES } from "@/constants";
import { OrderStatus } from "@/types";

type OrderActionButtonsProps = {
  editText: string;
  updateText: string;
  chooseLocationText: string;
  onClickEdit: () => void;
  onClickUpdate: () => void;
  onClickChooseLocation?: () => void;
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
      <Button type="button" onClick={onClickEdit}>
        {editText}
      </Button>
      <Button type="button" onClick={onClickUpdate}>
        {updateText}
      </Button>
      {status === ORDER_STATUSES.Fulfilled && (
        <Button type="button" onClick={onClickChooseLocation}>
          {chooseLocationText}
        </Button>
      )}
    </>
  );
};

export default OrderActionButtons;
