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
import { useGetStorageRoomsQuery } from "@/store";
import { useMoveSubstanceMutation } from "@/store/storageApi.ts";
import { LocationDetails } from "@/types";

type ChangeLocationDialogProps = {
  open: boolean;
  onClose: () => void;
  locationDetails: LocationDetails;
  selectedSubstanceId: number | null;
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

  const roomToMove = rooms?.find((room) => room.room === selectedRoom);

  const handleRoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRoom(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(event.target.value);
  };

  const handleAgree = () => {
    onClose();
    const locationToMove = roomToMove?.locations.find(
      (location) => location.locationName === selectedLocation
    );

    moveSubstance({
      oldRoomId: locationDetails?.locationId as number,
      substanceId: selectedSubstanceId as number,
      newLocationId: locationToMove?.locationId as number,
    });
  };

  if (isRoomsLoading) return <PageLoader />;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ paddingBottom: "5px" }}>
        {"Change location of this reagent?"}
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
        <Button disabled={!selectedLocation} onClick={handleAgree} autoFocus>
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeLocationDialog;
