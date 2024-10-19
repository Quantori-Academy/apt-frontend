import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

import { useGetStorageRoomsQuery } from "@/store";
import { Reagent } from "@/types";

import { PageLoader } from "../PageLoader";

const roomsData = [
  {
    roomId: 1,
    roomName: "Room 101",
    locationsInRoom: [
      {
        locationId: 3,
        locationName: "shelf 3",
        reagentsNumberInLocation: 9,
      },
    ],
  },
  {
    roomId: 2,
    roomName: "Room 102",
    locationsInRoom: [
      {
        locationId: 5,
        locationName: "shelf 13",
        reagentsNumberInLocation: 19,
      },
    ],
  },
];

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
  // const [selectedRoom, setSelectedRoom] = useState(
  //   reagentDetails.storageLocation.roomName
  // );

  const { data: rooms, isLoading } = useGetStorageRoomsQuery();

  // const [selectedLocation, setSelectedLocation] = useState();

  useEffect(() => {
    if (reagentDetails && rooms) {
      console.log("something");
      // const currentRoom=rooms
    }
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Dialog
      open={isEditing}
      onClose={() => setIsEditing(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Edit Reagent</DialogTitle>
      <DialogContent>
        <TextField
          label="Quantity Left"
          variant="outlined"
          // value={quantity}
          // onChange={(event) => setQuantity(event.target.value)}
          type="number"
          fullWidth
          margin="normal"
        />

        <Autocomplete
          options={roomsData}
          getOptionLabel={(option) => option.roomName}
          // value={selectedRoom}
          // onChange={(event, newRoom) => {
          //   setSelectedRoom(newRoom);
          //   setSelectedLocation(null);
          // }}
          renderInput={(params) => (
            <TextField {...params} label="Select Room" variant="outlined" />
          )}
        />

        {/* {selectedRoom && (
          <Autocomplete
            options={availableLocations}
            getOptionLabel={(option) => option.locationName}
            value={selectedLocation}
            onChange={(event, newLocation) => {
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
        )} */}

        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedRoom || !selectedLocation || quantity === ""}
        >
          Save Changes
        </Button> */}
        <Button onClick={() => setIsEditing(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};
export default ReagentEditForm;
