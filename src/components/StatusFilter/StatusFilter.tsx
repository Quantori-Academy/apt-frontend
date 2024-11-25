import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

import { StatusFilterOption } from "@/types";

const filterOptions: Array<StatusFilterOption> = [
  "All",
  "Pending",
  "Declined",
  "Completed",
  "Ordered",
  "Taken",
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
  const { t } = useTranslation();

  return (
    <FormControl size="medium" sx={{ width: "20%", padding: "5px" }}>
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
            {t(`requests.statusFilter.${option}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusFilter;
