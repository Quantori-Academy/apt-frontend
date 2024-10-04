import { Alert, AlertColor, Snackbar, SnackbarProps } from "@mui/material";

interface SnackbarWithAlertProps extends SnackbarProps {
  severity?: AlertColor;
  message: string;
  open: boolean;
  autoHideDuration?: number;
}

function SnackbarWithAlert({
  open,
  severity,
  autoHideDuration,
  message,
  ...rest
}: SnackbarWithAlertProps) {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} {...rest}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarWithAlert;
