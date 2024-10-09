import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

import { useFieldVisibility } from "@/hooks";
import { UserLoginInput } from "@/types";

type RevealableFieldProps = {
  name: keyof UserLoginInput;
  register: UseFormRegister<UserLoginInput>;
  error: FieldError | undefined;
  label: string;
  options: RegisterOptions<UserLoginInput>;
};

const RevealableField: React.FC<RevealableFieldProps> = ({
  name,
  register,
  error,
  label,
  options,
}) => {
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
