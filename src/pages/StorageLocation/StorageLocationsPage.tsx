import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AddStorageLocation from "@/components/StorageLocation/AddStorageLocation";
import StorageLocationList from "@/components/StorageLocation/StorageLocationList";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  fetchStorageLocations,
  selectStorageError,
  selectStorageLocations,
  selectStorageStatus,
} from "@/store/slices/storageSlice";

const StorageLocationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const storageLocations = useSelector(selectStorageLocations);
  const status = useSelector(selectStorageStatus);
  const error = useSelector(selectStorageError);

  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchStorageLocations());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddLocation = (message: string) => {
    setMessage(message);
    setOpenDialog(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Storage Locations
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ marginBottom: 2 }}
      >
        Add Storage Location
      </Button>

      {message && <Typography color="success.main">{message}</Typography>}

      {status === "loading" && <CircularProgress />}
      {status === "failed" && (
        <Typography color="error">Error: {error}</Typography>
      )}

      {status === "succeeded" && (
        <StorageLocationList locations={storageLocations} />
      )}

      {openDialog && (
        <AddStorageLocation
          onCancel={handleCloseDialog}
          onAddLocation={handleAddLocation}
        />
      )}
    </Box>
  );
};

export default StorageLocationPage;
