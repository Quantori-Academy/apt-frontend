import { Alert, AlertColor, Snackbar, SnackbarProps } from "@mui/material";

interface AlertSnackbarProps extends Omit<SnackbarProps, "children"> {
  children: React.ReactNode;
  severity?: AlertColor;
}

function AlertSnackbar({ severity, children, ...rest }: AlertSnackbarProps) {
  return (
    <Snackbar {...rest}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
}

export default AlertSnackbar;
