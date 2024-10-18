import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { ReagentCategory } from "@/types";

export type FilterOption = ReagentCategory | "All";

const filterOptions: Array<FilterOption> = ["Reagent", "Sample", "All"];

type FilterReagentsProps = {
  filter: FilterOption;
  setFilter: (filter: FilterOption) => void;
  setPage: (page: number) => void;
};
const CategoryFilter: React.FC<FilterReagentsProps> = ({
  filter,
  setFilter,
  setPage,
}) => {
  return (
    <FormControl size="medium" sx={{ width: "30%" }}>
      <InputLabel sx={{ height: "auto" }} id="selectRole">
        Category
      </InputLabel>
      <Select
        variant={"outlined"}
        labelId="selectCategory"
        value={filter}
        label="Category"
        onChange={(e) => {
          setFilter(e.target.value as FilterOption);
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

export default CategoryFilter;
