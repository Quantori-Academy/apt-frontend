import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

import { usePasswordVisibility } from "@/hooks";
import { UserInputData } from "@/types";

type RevealableFieldProps = {
  name: keyof UserInputData;
  register: UseFormRegister<UserInputData>;
  error: FieldError | undefined;
  label: string;
  options: RegisterOptions<UserInputData>;
};

const RevealableField: React.FC<RevealableFieldProps> = ({
  name,
  register,
  error,
  label,
  options,
}) => {
  const { isPasswordShown, handlePassVisibility, inputRef } =
    usePasswordVisibility();

  return (
    <TextField
      error={!!error}
      sx={{ width: "100%" }}
      label={label}
      type={isPasswordShown ? "text" : "password"}
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
              onClick={handlePassVisibility}
              edge="end"
            >
              {isPasswordShown ? (
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
