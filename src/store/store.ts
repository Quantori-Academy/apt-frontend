import { Action, ThunkAction, combineSlices } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/authSlice";
import { counterSlice } from "./slices/counterSlice";
import { api } from "./api";

const rootReducer = combineSlices(counterSlice, authSlice, api);

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

  return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
