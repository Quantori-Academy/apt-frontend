import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

import { StatusFilter } from "@/types";

type OrdersFilterProps = {
  statusFilter: StatusFilter;
  handleStatusChange: (value: StatusFilter) => void;
};

const statuses: StatusFilter[] = [
  "All",
  "Pending",
  "Submitted",
  "Fulfilled",
  "Cancelled",
];

const OrdersFilter: React.FC<OrdersFilterProps> = ({
  statusFilter,
  handleStatusChange,
}) => {
  const { t } = useTranslation();

  return (
    <FormControl fullWidth size="medium" variant="outlined">
      <InputLabel sx={{ height: "auto" }} id="selectStatus">
        {t("orders.statuses.status")}
      </InputLabel>
      <Select
        labelId="selectStatus"
        value={statusFilter}
        label={t("orders.statuses.status")}
        onChange={(e) => handleStatusChange(e.target.value as StatusFilter)}
      >
        {statuses.map((option) => (
          <MenuItem key={option} value={option}>
            {t(`orders.statuses.${option}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default OrdersFilter;
