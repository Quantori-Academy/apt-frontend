import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import StorageRoomDetails from "@/components/StorageLocation/StorageRoomDetails";
import { AppDispatch } from "@/store";
import {
  getStorageRoomDetails,
  selectStorageError,
  selectStorageRoomDetails,
  selectStorageStatus,
} from "@/store/slices/storageSlice";

const StorageRoomDetailsPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const storageRoomDetails = useSelector(selectStorageRoomDetails);
  const status = useSelector(selectStorageStatus);
  const error = useSelector(selectStorageError);

  useEffect(() => {
    if (roomId) {
      dispatch(getStorageRoomDetails(Number(roomId)));
    }
  }, [dispatch, roomId]);

  if (status === "loading")
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (status === "failed")
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );

  if (!storageRoomDetails)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">No details available.</Typography>
      </Box>
    );

  const { storage_room, substances } = storageRoomDetails;

  return (
    <Box sx={{ padding: 3 }}>
      <StorageRoomDetails
        roomName={storage_room || "Unknown"}
        substances={substances || []}
      />
    </Box>
  );
};

export default StorageRoomDetailsPage;
