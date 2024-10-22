import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { PageLoader } from "@/components";
import { useLocationQuantityDetails } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import {
  useDeleteSubstanceMutation,
  useGetStorageRoomsQuery,
  useUpdateReagentMutation,
} from "@/store";
import { RoomData } from "@/types";
import { Reagent } from "@/types/reagent.ts";

type ReagentEditFormProps = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  reagentDetails: Reagent;
  reagentLocationDetails: RoomData;
};

const ReagentEditForm: React.FC<ReagentEditFormProps> = ({
  isEditing,
  setIsEditing,
  reagentDetails,
  reagentLocationDetails,
}) => {
  const { data: rooms, isLoading } = useGetStorageRoomsQuery();

  const [updateReagent] = useUpdateReagentMutation();

  const [deleteReagent] = useDeleteSubstanceMutation();

  const navigate = useNavigate();

  const {
    selectedRoom,
    setSelectedRoom,
    selectedLocation,
    setSelectedLocation,
    quantityLeft,
    setQuantityLeft,
  } = useLocationQuantityDetails(reagentDetails, reagentLocationDetails, rooms);

  if (isLoading) {
    return <PageLoader />;
  }

  const handleSubmit = async () => {
    try {
      if (quantityLeft === "0") {
        await deleteReagent(reagentDetails.substanceId).unwrap();
        navigate(RouteProtectedPath.substances);
      } else {
        await updateReagent({
          id: reagentDetails.substanceId,
          quantity: quantityLeft,
          storageLocation: {
            roomId: selectedRoom?.id,
            locationId: selectedLocation?.locationId,
          },
        }).unwrap();
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update reagent: ", err);
    }
  };

  const availableLocations = selectedRoom ? selectedRoom.locations : [];

  return (
    <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="sm">
      <DialogTitle>Edit Reagent</DialogTitle>
      <DialogContent
        sx={{
          "&.MuiDialogContent-root": {
            paddingTop: "10px",
          },
        }}
      >
        <TextField
          label="Quantity Left"
          variant="outlined"
          value={quantityLeft}
          inputProps={{ min: 0 }}
          onChange={(event) => setQuantityLeft(event.target.value)}
          type="number"
          fullWidth
          error={quantityLeft === "0"}
          helperText={
            quantityLeft === "0" && "Reagent will be deleted, if quantity is 0"
          }
          sx={{ marginBottom: "20px" }}
        />
        <Autocomplete
          sx={{ marginBottom: "20px" }}
          options={rooms || []}
          getOptionLabel={(option) =>
            option.room +
            (option.id === reagentLocationDetails.roomId ? " (current)" : "")
          }
          value={selectedRoom}
          onChange={(_, newRoom) => {
            setSelectedLocation(null);
            setSelectedRoom(newRoom);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Room" variant="outlined" />
          )}
        />
        {selectedRoom && (
          <Autocomplete
            sx={{ marginBottom: "25px" }}
            options={availableLocations}
            getOptionLabel={(option) =>
              option.locationName +
              (option.locationId === reagentLocationDetails.locationId
                ? " (current)"
                : "")
            }
            value={selectedLocation}
            onChange={(_, newLocation) => {
              setSelectedLocation(newLocation);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Location" variant="outlined" />
            )}
          />
        )}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedRoom || !selectedLocation || quantityLeft === ""}
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
