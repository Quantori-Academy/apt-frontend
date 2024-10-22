import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { reagentSampleApi } from "./reagentSampleApi";
import { reagentsApi } from "./reagentsApi";
import { authSlice } from "./slices/authSlice";
import { counterSlice } from "./slices/counterSlice";
import { storageApi } from "./storageApi";
import { usersApi } from "./usersApi";

const rootReducer = combineSlices(counterSlice, authSlice, usersApi, reagentSampleApi, reagentsApi, storageApi);

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        usersApi.middleware,
        reagentSampleApi.middleware,
        reagentsApi.middleware,
        storageApi.middleware
      ),
  });

  return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
