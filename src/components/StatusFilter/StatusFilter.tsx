import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

import { StatusFilterOption } from "@/types";

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
  const { t } = useTranslation();

  const filterOptions = [
    t("requests.statusFilter.Pending"),
    t("requests.statusFilter.Submitted"),
    t("requests.statusFilter.Canceled"),
    t("requests.statusFilter.Fulfilled"),
    t("requests.statusFilter.All"),
  ];

  return (
    <FormControl size="small" sx={{ width: "20%", padding: "5px" }}>
      <InputLabel sx={{ height: "auto" }} id="selectRole">
        {t("requests.table.Status")}
      </InputLabel>
      <Select
        variant={"outlined"}
        labelId="selectStatus"
        value={filter}
        label={t("requests.table.Status")}
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
