import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { apiManager } from "@/api";
import { Token, UserAuth, UserLoginInput } from "@/types";

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

export const loginUser = createAsyncThunk("auth/login", async (loginData: UserLoginInput, { rejectWithValue }) => {
  try {
    return apiManager.login(loginData);
  } catch (err) {
    if (typeof err === "object" && err !== null && "message" in err) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const authSlice = createReducerSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    logout: create.reducer((state) => {
      localStorage.removeItem("accessToken");
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
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<Token>) => {
        const { token, refresh_token } = action.payload;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refresh_token);

        state.isLoading = false;
        state.errorMessage = null;
        state.user = decodeUser(action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | unknown>) => {
        state.isLoading = false;
        state.errorMessage = (action.payload as string) || "Unknown error!";
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
