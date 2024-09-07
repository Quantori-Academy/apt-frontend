import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

// If you need to create a slice with async thunks.
export const createReducerSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
