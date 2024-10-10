import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiManager } from "@/api/apiManager";
import { RootState } from "@/store";
import { StorageRoomsBrief } from "@/types";

interface StorageState {
  storageLocations: StorageRoomsBrief[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StorageState = {
  storageLocations: [],
  status: "idle",
  error: null,
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};

export const fetchStorageLocations = createAsyncThunk(
  "storage/fetchStorageLocations",
  async (_, { rejectWithValue }) => {
    try {
      return await apiManager.getStorageLocations();
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const addStorageLocation = createAsyncThunk(
  "storage/addStorageLocation",
  async (data: { room: string }, { rejectWithValue }) => {
    try {
      return await apiManager.addStorageLocation(data);
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const editStorageLocation = createAsyncThunk(
  "storage/editStorageLocation",
  async ({ id, roomName }: { id: number; roomName: string }, { rejectWithValue }) => {
    try {
      return await apiManager.editStorageLocation(id, roomName);
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a storage location
export const deleteStorageLocation = createAsyncThunk<number, number>(
  "storage/deleteStorageLocation",
  async (id: number, { rejectWithValue }) => {
    try {
      await apiManager.deleteStorageLocation(id);
      return id;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
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
    builder.addCase(fetchStorageLocations.fulfilled, (state, action: PayloadAction<StorageRoomsBrief[]>) => {
      state.status = "succeeded";
      state.storageLocations = action.payload;
    });
    builder.addCase(fetchStorageLocations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    builder.addCase(addStorageLocation.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addStorageLocation.fulfilled, (state, action: PayloadAction<StorageRoomsBrief>) => {
      state.status = "succeeded";
      state.storageLocations.push(action.payload);
    });
    builder.addCase(addStorageLocation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    builder.addCase(editStorageLocation.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editStorageLocation.fulfilled, (state, action: PayloadAction<StorageRoomsBrief>) => {
      state.status = "succeeded";
      const index = state.storageLocations.findIndex((location) => location.id === action.payload.id);
      if (index !== -1) {
        state.storageLocations[index] = action.payload;
      }
    });
    builder.addCase(editStorageLocation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
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
      state.error = action.payload as string;
    });
  },
});

export const selectStorageLocations = (state: RootState) => state.storage.storageLocations;
export const selectStorageStatus = (state: RootState) => state.storage.status;
export const selectStorageError = (state: RootState) => state.storage.error;

export default storageSlice.reducer;
