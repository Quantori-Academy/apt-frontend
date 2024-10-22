import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/authSlice";
import { counterSlice } from "./slices/counterSlice";
import { storageApi } from "./storageApi";
import { substancesApi } from "./substancesApi.ts";
import { usersApi } from "./usersApi";

const rootReducer = combineSlices(counterSlice, authSlice, storageApi, usersApi, substancesApi);

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware, storageApi.middleware, substancesApi.middleware),
  });

  return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
