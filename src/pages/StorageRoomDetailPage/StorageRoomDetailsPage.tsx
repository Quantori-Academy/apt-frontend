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

// Import selectors and actions

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

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  if (!storageRoomDetails) return <div>No details available</div>;

  const { storage_room, substances } = storageRoomDetails;

  return (
    <StorageRoomDetails
      roomName={storage_room || "Unknown"}
      substances={substances || []}
    />
  );
};

export default StorageRoomDetailsPage;
