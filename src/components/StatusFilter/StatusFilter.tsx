import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { StatusFilterOption } from "@/types";

const filterOptions: Array<StatusFilterOption> = [
  "Pending",
  "Ordered",
  "Declined",
  "All",
];

type StatusFilterProps = {
  filter: StatusFilterOption;
  setFilter: (filter: StatusFilterOption) => void;
  setPage: (page: number) => void;
};
const StatusFilter: React.FC<StatusFilterProps> = ({
  filter,
  setFilter,
  setPage,
}) => {
  return (
    <FormControl size="medium" sx={{ width: "30%" }}>
      <InputLabel sx={{ height: "auto" }} id="selectRole">
        Status
      </InputLabel>
      <Select
        variant={"outlined"}
        labelId="selectStatus"
        value={filter}
        label="Status"
        onChange={(e) => {
          setFilter(e.target.value as StatusFilterOption);
          setPage(1);
        }}
      >
        {filterOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusFilter;
