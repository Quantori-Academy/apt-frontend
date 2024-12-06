import { PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { Token, UserAuth } from "@/types";
import { isFetchBaseQueryError } from "@/utils/isFetchBaseQueryError";

import { authApi } from "../authApi";
import { createReducerSlice } from "../createReducerSlice";

export type AuthSliceState = {
  isLoading: boolean;
  errorMessage: string | null;
  isAuthenticated: boolean;
  user: UserAuth | null;
};

const decodeUser = (token: string): UserAuth | null => {
  try {
    return jwtDecode<UserAuth>(token);
  } catch {
    return null;
  }
};

const token = localStorage.getItem("accessToken");
const user = token ? decodeUser(token) : null;

const initialState: AuthSliceState = {
  isLoading: false,
  errorMessage: null,
  isAuthenticated: !!user,
  user: user,
};

export const authSlice = createReducerSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    logout: create.reducer((state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.isAuthenticated = false;
      state.user = null;
    }),
  }),

  selectors: {
    selectErrorMessage: (state) => state.errorMessage,
    selectLoading: (state) => state.isLoading,
    selectUserRole: (state) => state.user?.role,
    selectUserId: (state) => state.user?.id,
    selectUserIsAuthenticated: (state) => state.isAuthenticated,
    selectUsername: (state) => state.user?.username,
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action: PayloadAction<Token>) => {
        const { token, refresh_token } = action.payload;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refresh_token);

        state.isLoading = false;
        state.errorMessage = null;
        state.user = decodeUser(action.payload.token);
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action: PayloadAction<string | unknown>) => {
        state.isLoading = false;
        state.errorMessage =
          (isFetchBaseQueryError(action.payload) && (action.payload.data as string)) || "An unknown error occurred";
      });
  },
});

export const { logout } = authSlice.actions;
export const {
  selectErrorMessage,
  selectLoading,
  selectUserRole,
  selectUserId,
  selectUserIsAuthenticated,
  selectUsername,
} = authSlice.selectors;
