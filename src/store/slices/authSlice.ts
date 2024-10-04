import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { apiManager } from "@/api";
import { UserInputData } from "@/types";
import { User } from "@/types";

import { createReducerSlice } from "../createReducerSlice";

type AuthSliceState = {
  isLoading: boolean;
  errorMessage: string | null;
  user: User | null;
};

const initialState: AuthSliceState = {
  isLoading: false,
  errorMessage: null,
  user: null,
};

export const loginUser = createAsyncThunk("auth/login", async (loginData: UserInputData, { rejectWithValue }) => {
  try {
    const response = await apiManager.login(loginData);
    localStorage.setItem("accessToken", response.accessToken);
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
      state.user = null;
    }),
  }),
  selectors: {
    selectErrorMessage: (state) => state.errorMessage,
    selectLoading: (state) => state.isLoading,
    selectUserRole: (state) => state.user?.role,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            accessToken: string;
          }>
        ) => {
          state.isLoading = false;
          state.errorMessage = null;
          const decodedToken = jwtDecode<User>(action.payload.accessToken);
          state.user = decodedToken;
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | unknown>) => {
        state.isLoading = false;
        state.errorMessage = (action.payload as string) || "Unknown error!";
      });
  },
});

export const { logout } = authSlice.actions;
export const { selectErrorMessage, selectLoading, selectUserRole } = authSlice.selectors;
