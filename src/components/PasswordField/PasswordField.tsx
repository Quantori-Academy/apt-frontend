import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { TextField } from "@mui/material";

import { usePasswordVisibility } from "@/hooks";

import styles from "./PasswordField.module.css";

type PasswordFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
  error,
}) => {
  const { isPasswordShown, handlePassVisibility, inputRef } =
    usePasswordVisibility();

  return (
    <div className={styles.passwordContainer}>
      <TextField
        error={error}
        label={`Password${error ? " required" : ""}`}
        name="password"
        type={isPasswordShown ? "text" : "password"}
        variant="outlined"
        size="small"
        value={value}
        onChange={onChange}
        inputRef={inputRef}
      />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handlePassVisibility}
        className={styles.iconButton}
      >
        {isPasswordShown ? (
          <VisibilityOffOutlinedIcon fontSize="small" />
        ) : (
          <RemoveRedEyeOutlinedIcon fontSize="small" />
        )}
      </button>
    </div>
  );
};
export default PasswordField;
