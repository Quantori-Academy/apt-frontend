import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiManager } from "@/api/apiManager";
import { RootState } from "@/store";
import { StorageLocation } from "@/types";

interface StorageState {
  storageLocations: StorageLocation[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StorageState = {
  storageLocations: [],
  status: "idle",
  error: null,
};

export const fetchStorageLocations = createAsyncThunk(
  "storage/fetchStorageLocations",
  async (_, { rejectWithValue }) => {
    try {
      return await apiManager.getStorageLocations();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addStorageLocation = createAsyncThunk(
  "storage/addStorageLocation",
  async (data: { room: string; name: string }, { rejectWithValue }) => {
    try {
      return await apiManager.addStorageLocation(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editStorageLocation = createAsyncThunk(
  "storage/editStorageLocation",
  async ({ id, data }: { id: number; data: { room: string; name: string } }, { rejectWithValue }) => {
    try {
      return await apiManager.editStorageLocation(id, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteStorageLocation = createAsyncThunk<number, number>(
  "storage/deleteStorageLocation",
  async (id: number, { rejectWithValue }) => {
    try {
      await apiManager.deleteStorageLocation(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStorageLocations.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStorageLocations.fulfilled, (state, action: PayloadAction<StorageLocation[]>) => {
      state.status = "succeeded";
      state.storageLocations = action.payload;
    });
    builder.addCase(fetchStorageLocations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to load storage locations";
    });

    builder.addCase(addStorageLocation.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addStorageLocation.fulfilled, (state, action: PayloadAction<StorageLocation>) => {
      state.status = "succeeded";
      state.storageLocations.push(action.payload);
    });
    builder.addCase(addStorageLocation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to add storage location";
    });

    builder.addCase(editStorageLocation.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editStorageLocation.fulfilled, (state, action: PayloadAction<StorageLocation>) => {
      state.status = "succeeded";
      const index = state.storageLocations.findIndex((location) => location.id === action.payload.id);
      if (index !== -1) {
        state.storageLocations[index] = action.payload;
      }
    });
    builder.addCase(editStorageLocation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to edit storage location";
    });

    builder.addCase(deleteStorageLocation.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteStorageLocation.fulfilled, (state, action: PayloadAction<number>) => {
      state.status = "succeeded";
      state.storageLocations = state.storageLocations.filter((location) => location.id !== action.payload);
    });
    builder.addCase(deleteStorageLocation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to delete storage location";
    });
  },
});

export const selectStorageLocations = (state: RootState) => state.storage.storageLocations;
export const selectStorageStatus = (state: RootState) => state.storage.status;
export const selectStorageError = (state: RootState) => state.storage.error;
