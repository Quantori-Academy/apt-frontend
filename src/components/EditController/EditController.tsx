import { TextField } from "@mui/material";
import {
  Controller,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

import { EditableRowsProps } from "@/types";

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
          helperText={errors?.[fieldName]?.message as string}
          variant="outlined"
        />
      )}
    />
  );
};

export default EditController;
