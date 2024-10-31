import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <FormControl fullWidth size="medium" variant="outlined">
      <InputLabel sx={{ height: "auto" }} id="selectRole">
        {t("users.filters.role")}
      </InputLabel>
      <Select
        labelId="selectRole"
        value={roleFilter}
        label={t("users.filters.role")}
        onChange={(e) => setRoleFilter(e.target.value as RoleFilterState)}
      >
        {roles.map((option) => (
          <MenuItem key={option} value={option}>
            {t(`users.roles.${option}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default RoleFilter;
