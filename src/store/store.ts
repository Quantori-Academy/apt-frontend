import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { reagentApi } from "@/store/reagentApi.ts";
import { samplesApi } from "@/store/samplesApi.ts";

import { reagentSampleApi } from "./reagentSampleApi";
import { reagentsApi } from "./reagentsApi";
import { authSlice } from "./slices/authSlice";
import { counterSlice } from "./slices/counterSlice";
import { usersApi } from "./usersApi";

const rootReducer = combineSlices(
  counterSlice,
  authSlice,
  usersApi,
  reagentSampleApi,
  reagentsApi,
  samplesApi,
  reagentApi
);

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        usersApi.middleware,
        reagentSampleApi.middleware,
        reagentsApi.middleware,
        samplesApi.middleware,
        reagentApi.middleware
      ),
  });

  return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
