import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  "Canceled",
];
const OrdersFilter: React.FC<OrdersFilterProps> = ({
  statusFilter,
  handleStatusChange,
}) => {
  return (
    <FormControl fullWidth size="medium" variant="outlined">
      <InputLabel sx={{ height: "auto" }} id="selectStatus">
        Status
      </InputLabel>
      <Select
        labelId="selectStatus"
        value={statusFilter}
        label="Status"
        onChange={(e) => handleStatusChange(e.target.value as StatusFilter)}
      >
        {statuses.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default OrdersFilter;
