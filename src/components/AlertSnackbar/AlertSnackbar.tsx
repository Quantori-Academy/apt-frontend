import { Alert, AlertColor, Snackbar, SnackbarProps } from "@mui/material";

interface AlertSnackbarProps extends Omit<SnackbarProps, "children"> {
  children: React.ReactNode;
  severity?: AlertColor;
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  severity,
  children,
  ...rest
}) => {
  return (
    <Snackbar autoHideDuration={3000} {...rest}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
