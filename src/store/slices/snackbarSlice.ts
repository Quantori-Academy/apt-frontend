import { PayloadAction } from "@reduxjs/toolkit";

import { createReducerSlice } from "@/store";

type SnackbarStatus = "success" | "error";

type SnackbarState = {
  message: string;
  severity: SnackbarStatus;
  open?: boolean;
};

const initialState: SnackbarState = {
  message: "",
  severity: "success",
  open: false,
};

export const snackbarSlice = createReducerSlice({
  name: "snackbar",
  initialState,
  reducers: (create) => ({
    showSnackbar: create.reducer((state, action: PayloadAction<SnackbarState>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    }),

    hideSnackbar: create.reducer((state) => {
      state.severity = "success";
      state.open = false;
    }),
  }),

  selectors: {
    selectIsSnackBarOpen: (state) => state.open,
    selectSnackbarMessage: (state) => state.message,
    selectSnackbarStatus: (state) => state.severity,
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export const { selectIsSnackBarOpen, selectSnackbarMessage, selectSnackbarStatus } = snackbarSlice.selectors;
