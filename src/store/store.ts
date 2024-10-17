import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import { api } from "./api";
import { authSlice } from "./slices/authSlice";
import { counterSlice } from "./slices/counterSlice";
import { storageApi } from "./storageApi";

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  auth: authSlice.reducer,
  [api.reducerPath]: api.reducer,
  [storageApi.reducerPath]: storageApi.reducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, storageApi.middleware),
  });

  return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
