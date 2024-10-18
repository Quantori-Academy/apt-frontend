import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

type Severity = "success" | "error";
type SnackbarState = {
  isOpen: boolean;
  severity: Severity;
  text: string;
};

export const useAlertSnackbar = (initialState: SnackbarState) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    isOpen: initialState.isOpen,
    severity: initialState.severity,
    text: initialState.text,
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
