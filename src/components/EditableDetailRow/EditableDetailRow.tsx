import { TableCell, TableRow, TextField, Typography } from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

type EditableDetailTextFieldType = "text" | "number";

type EditableDetailRowProps<T extends FieldValues> = {
  label: string;
  value?: string | number | null;
  isEditable?: boolean;
  requiredFields?: boolean;
  requiredMessage?: string;
  fieldName: Path<T>;
  errors?: FieldErrors<T>;
  TextFieldType?: EditableDetailTextFieldType;
  control: Control<T>;
};

const EditableDetailRow = <T extends FieldValues>({
  label,
  value,
  isEditable,
  requiredFields = false,
  requiredMessage,
  fieldName,
  errors,
  TextFieldType = "text",
  control,
}: EditableDetailRowProps<T>) => {
  return (
    <TableRow>
      <TableCell>
        <Typography fontWeight="bold">{label}:</Typography>
      </TableCell>
      <TableCell align="center">
        {isEditable ? (
          <Controller
            name={fieldName}
            control={control}
            defaultValue={value as PathValue<T, Path<T>>}
            rules={{
              ...(requiredFields && {
                required: requiredMessage,
              }),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                type={TextFieldType}
                error={!!errors?.[fieldName]}
                helperText={errors?.[fieldName]?.message as string}
                variant="outlined"
              />
            )}
          />
        ) : (
          value || "-"
        )}
      </TableCell>
    </TableRow>
  );
};

export default EditableDetailRow;
