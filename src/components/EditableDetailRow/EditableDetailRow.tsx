import { TableCell, TableRow, TextField, Typography } from "@mui/material";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type EditableDetailTextFieldType = "text" | "number";

type EditableDetailRowProps<T extends FieldValues> = {
  label: string;
  value: string | number | null | undefined;
  isEditable?: boolean;
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  errors?: FieldErrors<T>;
  requiredFields?: boolean;
  requiredMessage?: string;
  TextFieldType?: EditableDetailTextFieldType;
};

const EditableDetailRow = <T extends FieldValues>({
  label,
  value,
  isEditable,
  register,
  fieldName,
  errors,
  requiredFields = false,
  requiredMessage,
  TextFieldType = "text",
}: EditableDetailRowProps<T>) => {
  return (
    <TableRow>
      <TableCell>
        <Typography fontWeight="bold">{label}:</Typography>
      </TableCell>
      <TableCell align="center">
        {isEditable ? (
          <TextField
            size="small"
            type={TextFieldType}
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

export default EditableDetailRow;
