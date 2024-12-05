import { TextField } from "@mui/material";
import {
  Controller,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

import { EditableRowsProps } from "@/types";
import { decimalFormatter } from "@/utils";

type EditControllerProps<T extends FieldValues> = EditableRowsProps<T>;

const EditController = <T extends FieldValues>({
  value,
  fieldName,
  errors,
  rules = {},
  TextFieldType = "text",
  control,
}: EditControllerProps<T>) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={value as PathValue<T, Path<T>>}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          size="small"
          type={TextFieldType}
          error={!!errors?.[fieldName]}
          variant="outlined"
          onChange={(e) => {
            if (fieldName === "pricePerUnit" || fieldName === "quantity") {
              value = decimalFormatter(e.target.value);
              field.onChange(value);
            } else {
              field.onChange(e);
            }
          }}
        />
      )}
    />
  );
};

export default EditController;
