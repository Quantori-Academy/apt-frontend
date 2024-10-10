import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FieldValues, Path } from "react-hook-form";

import { useFieldVisibility } from "@/hooks";

type RevealableFieldProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  label: string;
  options: RegisterOptions<T>;
};

const RevealableField = <T extends FieldValues>({
  name,
  register,
  error,
  label,
  options,
}: RevealableFieldProps<T>) => {
  const { isFieldShown, toggleFieldVisibility, inputRef } =
    useFieldVisibility();

  return (
    <TextField
      error={!!error}
      sx={{ width: "100%" }}
      label={label}
      type={isFieldShown ? "text" : "password"}
      variant="outlined"
      size="small"
      inputRef={inputRef}
      helperText={error?.message}
      {...register(name, options)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={toggleFieldVisibility}
              edge="end"
            >
              {isFieldShown ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <RemoveRedEyeOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default RevealableField;
