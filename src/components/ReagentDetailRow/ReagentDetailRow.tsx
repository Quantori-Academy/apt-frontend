import { TableCell, TableRow, TextField, Typography } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { OrderReagent } from "@/types";

type ReagentDetailRowProps = {
  label: string;
  value: string | number | null | undefined;
  isEditable: boolean;
  register: UseFormRegister<OrderReagent>;
  fieldName: keyof OrderReagent;
  errors?: FieldErrors;
  requiredFields?: boolean;
  requiredMessage?: string;
};

const ReagentDetailRow: React.FC<ReagentDetailRowProps> = ({
  label,
  value,
  isEditable,
  register,
  fieldName,
  errors,
  requiredFields = false,
  requiredMessage,
}) => {
  return (
    <TableRow>
      <TableCell>
        <Typography fontWeight="bold">{label}:</Typography>
      </TableCell>
      <TableCell align="center">
        {isEditable ? (
          <TextField
            {...register(fieldName, {
              ...(requiredFields && {
                required: requiredMessage,
              }),
            })}
            defaultValue={value}
            error={!!errors?.[fieldName]}
            helperText={errors?.[fieldName]?.message as string}
            variant="outlined"
          />
        ) : (
          value || "-"
        )}
      </TableCell>
    </TableRow>
  );
};

export default ReagentDetailRow;
