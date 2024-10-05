import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FieldError, UseFormRegister } from "react-hook-form";

import { usePasswordVisibility } from "@/hooks";
import { UserInputData } from "@/types";

type PasswordFieldProps = {
  register: UseFormRegister<UserInputData>;
  error: FieldError | undefined;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ register, error }) => {
  const { isPasswordShown, handlePassVisibility, inputRef } =
    usePasswordVisibility();

  return (
    <TextField
      error={!!error}
      sx={{ width: "100%" }}
      label="Password"
      type={isPasswordShown ? "text" : "password"}
      variant="outlined"
      size="small"
      inputRef={inputRef}
      helperText={error?.message}
      {...register("password", {
        required: "Password is required!",
      })}
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
export default PasswordField;
