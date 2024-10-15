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

const token = localStorage.getItem("accessToken");
const user = token ? jwtDecode<UserAuth>(token) : null;

const initialState: AuthSliceState = {
  isLoading: false,
  errorMessage: null,
  isAuthenticated: !!user,
  user: user,
};

export const loginUser = createAsyncThunk("auth/login", async (loginData: UserLoginInput, { rejectWithValue }) => {
  try {
    const response = await apiManager.login(loginData);
    localStorage.setItem("accessToken", response.token);
    return response;
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<Token>) => {
        state.isLoading = false;
        state.errorMessage = null;
        state.user = jwtDecode<UserAuth>(action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | unknown>) => {
        state.isLoading = false;
        state.errorMessage = (action.payload as string) || "Unknown error!";
      });
  },
});

export const { logout } = authSlice.actions;
export const { selectErrorMessage, selectLoading, selectUserRole, selectUserId, selectUserIsAuthenticated } =
  authSlice.selectors;
