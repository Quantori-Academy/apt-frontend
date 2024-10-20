import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

type Severity = "success" | "error";
type SnackbarState = {
  isOpen: boolean;
  severity: Severity;
  text: string;
};

const defaultInitialState: SnackbarState = {
  isOpen: false,
  severity: "success",
  text: "",
};

export const useAlertSnackbar = (
  initialState: SnackbarState = defaultInitialState
) => {
  const { isOpen, severity, text } = initialState;
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    isOpen,
    severity,
    text,
  });

  const openSnackbar = (severity: Severity, text: string) => {
    setSnackbarState({
      isOpen: true,
      severity,
      text,
    });
  };

  const closeSnackbar = () => {
    setSnackbarState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const SnackbarComponent = () => (
    <Snackbar
      open={snackbarState.isOpen}
      autoHideDuration={3000}
      onClose={closeSnackbar}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbarState.severity}
        sx={{ width: "100%" }}
      >
        {snackbarState.text}
      </Alert>
    </Snackbar>
  );

  return { openSnackbar, closeSnackbar, SnackbarComponent };
};

export default useAlertSnackbar;
