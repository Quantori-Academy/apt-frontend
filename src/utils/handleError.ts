import type { TFunction } from "i18next";

import { isFetchBaseQueryError } from "./isFetchBaseQueryError";

type handleErrorProps = {
  error: unknown;
  t: TFunction;
  showError: (message: string) => void;
};

export const handleError = ({ error, t, showError }: handleErrorProps): void => {
  if (isFetchBaseQueryError(error) && error.data) {
    showError(t(`backendErrors.${error.data}`));
  }
};
