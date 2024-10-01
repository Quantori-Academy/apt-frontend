import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiManager } from "@/api";

import { createReducerSlice } from "../createReducerSlice";

interface authSliceState {
  isLoading: boolean;
  error: string | null;
}

interface ILoginData {
  username: string;
  password: string;
}

const initialState: authSliceState = {
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk("auth/login", async (loginData: ILoginData, { rejectWithValue }) => {
  try {
    //ask
    const response = await apiManager.login(loginData);
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
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
    logout: create.reducer(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
