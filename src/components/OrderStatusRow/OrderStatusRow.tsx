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
  value: string | number | null | undefined;
  isUpdating: boolean;
  register: UseFormRegister<StatusForm>;
  currentStatus: OrderStatus;
};

const OrderStatusRow: React.FC<EditableDetailRowProps> = ({
  label,
  value,
  isUpdating,
  register,
  currentStatus,
}) => {
  const { t } = useTranslation();

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
            defaultValue={currentStatus}
            {...register("status")}
          >
            {Object.values(ORDER_STATUSES).map((status) => (
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
