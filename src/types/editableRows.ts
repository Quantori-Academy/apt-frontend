import type { Control, FieldErrors, FieldValues, Path, RegisterOptions } from "react-hook-form";

type EditableDetailTextFieldType = "text" | "number";

export type EditableRowsProps<T extends FieldValues> = {
  value?: string | number | null | boolean;
  fieldName: Path<T>;
  rules?: RegisterOptions<T>;
  errors?: FieldErrors<T>;
  TextFieldType?: EditableDetailTextFieldType;
  control: Control<T>;
};
