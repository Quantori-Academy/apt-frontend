import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { userRoles } from "@/constants";
import { RoleFilterState } from "@/pages/Users/Users";

type RoleFilterProps = {
  roleFilter: RoleFilterState;
  setRoleFilter: React.Dispatch<React.SetStateAction<RoleFilterState>>;
};

const RoleFilter: React.FC<RoleFilterProps> = ({
  roleFilter,
  setRoleFilter,
}) => {
  const roles: RoleFilterState[] = ["All", ...Object.values(userRoles)];

  return (
    <FormControl fullWidth size="medium" variant="outlined">
      <InputLabel sx={{ height: "auto" }} id="selectRole">
        Choose a Role
      </InputLabel>
      <Select
        labelId="selectRole"
        value={roleFilter}
        label="Choose a Role"
        onChange={(e) => setRoleFilter(e.target.value as RoleFilterState)}
      >
        {roles.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default RoleFilter;
