import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import { PageLoader } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useGetStorageRoomsQuery, useMoveSubstanceMutation } from "@/store";
import { LocationDetails } from "@/types";

type ChangeLocationDialogProps = {
  open: boolean;
  onClose: () => void;
  locationDetails: LocationDetails;
  selectedSubstanceId: string;
};

const ChangeLocationDialog: React.FC<ChangeLocationDialogProps> = ({
  open,
  onClose,
  locationDetails,
  selectedSubstanceId,
}) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const { data: rooms, isLoading: isRoomsLoading } = useGetStorageRoomsQuery();
  const [moveSubstance] = useMoveSubstanceMutation();

  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const roomToMove = rooms?.find((room) => room.room === selectedRoom);

  const handleRoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRoom(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(event.target.value);
  };

  const handleConfirm = async () => {
    onClose();
    const locationToMove = roomToMove?.locations.find(
      (location) => location.locationName === selectedLocation
    );

    const { error } = await moveSubstance({
      oldRoomId: locationDetails?.locationId,
      substanceId: selectedSubstanceId,
      newLocationId: locationToMove?.locationId,
    });

    if (error) {
      openSnackbar("error", "Failed to move substances!");
    } else {
      openSnackbar("success", "Substance moved successfully!");
      onClose();
    }
  };

  if (isRoomsLoading) return <PageLoader />;
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginBottom: "10px" }}>
          Change location of this substance?
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px !important" }}>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label="Rooms"
              fullWidth
              select
              value={selectedRoom}
              onChange={handleRoomChange}
            >
              {rooms?.map((room) => (
                <MenuItem key={room.id} value={room.room}>
                  {room.room}
                </MenuItem>
              ))}
            </TextField>
            {selectedRoom && (
              <TextField
                sx={{ marginTop: "25px" }}
                label="Location"
                fullWidth
                select
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                {roomToMove?.locations
                  .filter(
                    (location) =>
                      location.locationName !== locationDetails.locationName
                  )
                  .map((location) => (
                    <MenuItem
                      key={location.locationId}
                      value={location.locationName}
                    >
                      {location.locationName}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button
            disabled={!selectedLocation}
            onClick={handleConfirm}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {SnackbarComponent()}
    </>
  );
};

export default ChangeLocationDialog;
