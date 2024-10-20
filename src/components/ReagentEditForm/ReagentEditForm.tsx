import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { PageLoader } from "@/components";
import { useGetStorageRoomsQuery } from "@/store";
import { Reagent, RoomLocationBrief, StorageRoomsBrief } from "@/types";

// const roomsData = [
//   {
//     roomId: "1",
//     roomName: "Room 101",
//     locationsInRoom: [
//       {
//         locationId: "3",
//         locationName: "shelf 3",
//         reagentsNumberInLocation: 9,
//       },
//     ],
//   },
//   {
//     roomId: "2",
//     roomName: "Room 102",
//     locationsInRoom: [
//       {
//         locationId: "5",
//         locationName: "shelf 13",
//         reagentsNumberInLocation: 19,
//       },
//     ],
//   },
// ];

type ReagentEditFormProps = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  reagentDetails: Reagent;
};

const ReagentEditForm: React.FC<ReagentEditFormProps> = ({
  isEditing,
  setIsEditing,
  reagentDetails,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<StorageRoomsBrief | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] =
    useState<RoomLocationBrief | null>(null);

  const { data: rooms, isLoading } = useGetStorageRoomsQuery();
  useEffect(() => {
    if (reagentDetails && rooms?.length) {
      const currentRoom = rooms.find(
        (room) => room.id === reagentDetails.storageLocation.roomId
      );
      setSelectedRoom(currentRoom || null);

      if (currentRoom) {
        const currentLocation = currentRoom.locations.find(
          (location) =>
            location.location_id === reagentDetails.storageLocation.locationId
        );
        console.log(currentRoom, "Room");
        console.log(currentLocation, "location");
        setSelectedLocation(currentLocation || null);
      }
    }
  }, [reagentDetails, rooms]);

  if (isLoading) {
    return <PageLoader />;
  }
  const handleSubmit = () => {
    console.log("submited");
  };
  const availableLocations = selectedRoom ? selectedRoom.locations : [];
  return (
    <Dialog
      open={isEditing}
      onClose={() => setIsEditing(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Reagent</DialogTitle>
      <DialogContent sx={{ paddingTop: "10px !important" }}>
        {/* <TextField
          label="Quantity Left"
          variant="outlined"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          type="number"
          fullWidth
          margin="normal"
        /> */}

        <Autocomplete
          sx={{ marginBottom: "25px" }}
          options={rooms || []}
          getOptionLabel={(option) => option.room}
          value={selectedRoom}
          onChange={(event, newRoom) => {
            console.log(event);
            setSelectedLocation(null);
            setSelectedRoom(newRoom);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Room" variant="outlined" />
          )}
        />

        {selectedRoom && (
          <Autocomplete
            sx={{ marginBottom: "25px" }}
            options={availableLocations}
            getOptionLabel={(option) => option.location_name}
            value={selectedLocation}
            onChange={(event, newLocation) => {
              console.log(event);
              setSelectedLocation(newLocation);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Location"
                variant="outlined"
              />
            )}
          />
        )}

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedRoom || !selectedLocation}
          >
            Save Changes
          </Button>
          <Button onClick={() => setIsEditing(false)}>Close</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default ReagentEditForm;
