import {
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ORDER_STATUSES } from "@/constants";
import { OrderStatus, StatusForm } from "@/types";

type EditableDetailRowProps = {
  label: string;
  isUpdating: boolean;
  value?: string | number | null;
  currentStatus: OrderStatus;
  register: UseFormRegister<StatusForm>;
};

const OrderStatusRow: React.FC<EditableDetailRowProps> = ({
  label,
  isUpdating,
  value,
  currentStatus,
  register,
}) => {
  const { t } = useTranslation();

  let defaultMenuValue;
  const menuToShow = Object.values(ORDER_STATUSES).filter((status) => {
    if (currentStatus === ORDER_STATUSES.Pending) {
      defaultMenuValue = ORDER_STATUSES.Submitted;
      return status === ORDER_STATUSES.Submitted;
    } else if (currentStatus === ORDER_STATUSES.Submitted) {
      defaultMenuValue = status;
      return status === ORDER_STATUSES.Cancelled;
    }
  });

  return (
    <TableRow>
      <TableCell>
        <Typography fontWeight="bold">{label}:</Typography>
      </TableCell>
      <TableCell align="center">
        {isUpdating ? (
          <TextField
            select
            size="small"
            defaultValue={defaultMenuValue}
            {...register("status")}
          >
            {menuToShow.map((status) => (
              <MenuItem key={status} value={status}>
                {t(`orders.statuses.${status}`)}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          t(`orders.statuses.${value}`) || "-"
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrderStatusRow;
