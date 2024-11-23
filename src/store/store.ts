import { Action, ThunkAction, combineSlices, configureStore } from "@reduxjs/toolkit";

import { reagentRequestApi } from "@/store/reagentRequestApi.ts";

import { authApi } from "./authApi";
import { ordersApi } from "./ordersApi";
import { authSlice, snackbarSlice } from "./slices";
import { storageApi } from "./storageApi";
import { substancesApi } from "./substancesApi";
import { usersApi } from "./usersApi";

const rootReducer = combineSlices(
  authSlice,
  snackbarSlice,
  authApi,
  storageApi,
  usersApi,
  substancesApi,
  reagentRequestApi,
  ordersApi
);

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        usersApi.middleware,
        storageApi.middleware,
        substancesApi.middleware,
        reagentRequestApi.middleware,
        ordersApi.middleware
      ),
  });

  return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
