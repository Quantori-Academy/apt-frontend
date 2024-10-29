import { Action, ThunkAction, combineSlices, configureStore } from "@reduxjs/toolkit";

import { reagentRequestApi } from "@/store/reagentRequestApi.ts";

import { authSlice, counterSlice } from "./slices";
import { storageApi } from "./storageApi";
import { substancesApi } from "./substancesApi";
import { usersApi } from "./usersApi";

const rootReducer = combineSlices(counterSlice, authSlice, storageApi, usersApi, substancesApi, reagentRequestApi);

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        usersApi.middleware,
        storageApi.middleware,
        substancesApi.middleware,
        reagentRequestApi.middleware
      ),
  });

  return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
