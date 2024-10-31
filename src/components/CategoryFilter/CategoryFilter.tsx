import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

import { CategoryFilterOption } from "@/types";

const filterOptions: Array<CategoryFilterOption> = ["Reagent", "Sample", "All"];

type FilterReagentsProps = {
  filter: CategoryFilterOption;
  setFilter: (filter: CategoryFilterOption) => void;
  setPage: (page: number) => void;
};
const CategoryFilter: React.FC<FilterReagentsProps> = ({
  filter,
  setFilter,
  setPage,
}) => {
  const { t } = useTranslation();

  return (
    <FormControl size="medium" sx={{ width: "30%" }}>
      <InputLabel sx={{ height: "auto" }} id="selectRole">
        {t("substances.filters.label")}
      </InputLabel>
      <Select
        variant={"outlined"}
        labelId="selectCategory"
        value={filter}
        label={t("substances.filters.label")}
        onChange={(e) => {
          setFilter(e.target.value as CategoryFilterOption);
          setPage(1);
        }}
      >
        {filterOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {t(`substances.filters.options.${option}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
