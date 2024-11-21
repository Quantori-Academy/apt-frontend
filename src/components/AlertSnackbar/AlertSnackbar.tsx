import { Alert, Snackbar } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  hideSnackbar,
  selectIsSnackBarOpen,
  selectSnackbarMessage,
  selectSnackbarStatus,
} from "@/store";

const AlertSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectSnackbarMessage);
  const severity = useAppSelector(selectSnackbarStatus);
  const isOpen = useAppSelector(selectIsSnackBarOpen);

  const closeSnackbar = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
