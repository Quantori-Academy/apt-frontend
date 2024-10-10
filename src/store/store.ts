import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { storageSlice } from "@/store/slices/storageSlice.ts";

import { authSlice } from "./slices/authSlice";
import { counterSlice } from "./slices/counterSlice";

const rootReducer = combineSlices(counterSlice, authSlice, storageSlice);

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
