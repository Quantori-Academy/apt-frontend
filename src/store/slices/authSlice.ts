import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { apiManager } from "@/api";

import { createReducerSlice } from "../createReducerSlice";

interface IUser {
  id: string;
  role: string;
}

interface authSliceState {
  isLoading: boolean;
  error: string | null;
  user: IUser | null;
}

interface ILoginData {
  username: string;
  password: string;
}

const initialState: authSliceState = {
  isLoading: false,
  error: null,
  user: null,
};

export const loginUser = createAsyncThunk("auth/login", async (loginData: ILoginData, { rejectWithValue }) => {
  try {
    //ask
    const response = await apiManager.login(loginData);
    localStorage.setItem("accessToken", response.accessToken);
    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("An unknown error occured");
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
    selectError: (state) => state.error,
    selectLoading: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
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
          const decodedToken = jwtDecode<IUser>(action.payload.accessToken);
          state.user = decodedToken;
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | unknown>) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Unknown error!";
      });
  },
});

export const { logout } = authSlice.actions;
export const { selectError, selectLoading } = authSlice.selectors;
