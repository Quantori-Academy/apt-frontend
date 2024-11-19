import { useAppDispatch } from "@/hooks";
import { showSnackbar } from "@/store";

export type Severity = "success" | "error";

export const useAlertSnackbar = () => {
  const dispatch = useAppDispatch();

  const showSuccess = (message: string) => {
    dispatch(
      showSnackbar({
        severity: "success",
        message,
      })
    );
  };

  const showError = (message: string) => {
    dispatch(
      showSnackbar({
        severity: "error",
        message,
      })
    );
  };

  return { showSuccess, showError };
};

export default useAlertSnackbar;
