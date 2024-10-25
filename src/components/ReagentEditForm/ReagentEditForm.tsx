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
import { Severity, useLocationQuantityDetails } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import {
  useDeleteSubstanceMutation,
  useGetStorageRoomsQuery,
  useUpdateSubstanceMutation,
} from "@/store";
import { Reagent, RoomData, Sample, SubstancesCategory } from "@/types";

type ReagentEditFormProps = {
  substanceType: SubstancesCategory;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  substanceDetails: Reagent | Sample;
  substanceLocationDetails: RoomData;
  openSnackbar: (severite: Severity, text: string) => void;
};

const ReagentEditForm: React.FC<ReagentEditFormProps> = ({
  isEditing,
  setIsEditing,
  substanceDetails,
  substanceLocationDetails,
  substanceType,
  openSnackbar,
}) => {
  const { data: rooms, isLoading } = useGetStorageRoomsQuery();

  const [updateSubstance] = useUpdateSubstanceMutation();

  const [deleteSubstance] = useDeleteSubstanceMutation();

  const navigate = useNavigate();

  const {
    selectedRoom,
    setSelectedRoom,
    selectedLocation,
    setSelectedLocation,
    quantityLeft,
    setQuantityLeft,
  } = useLocationQuantityDetails(
    substanceDetails,
    substanceLocationDetails,
    rooms
  );

  if (isLoading) {
    return <PageLoader />;
  }

  const handleSubmit = async () => {
    try {
      if (quantityLeft === "0") {
        await deleteSubstance(substanceDetails.substanceId).unwrap();

        openSnackbar("success", `${substanceType} deleted successfully!`);

        navigate(RouteProtectedPath.substances);
      } else {
        const updatedDetails = {
          id: substanceDetails.substanceId,
          oldLocationId: substanceLocationDetails.locationId,
          quantity: quantityLeft,
          newLocationId: selectedLocation?.locationId,
        };
        updateSubstance(updatedDetails);
        openSnackbar("success", `${substanceType} updated successfully!`);
        setIsEditing(false);
      }
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        openSnackbar("error", errorMessage);
      } else {
        openSnackbar("error", "An unexpected error occurred");
      }
    }
  };

  const availableLocations = selectedRoom ? selectedRoom.locations : [];

  return (
    <>
      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        maxWidth="sm"
      >
        <DialogTitle>Edit {substanceType.toLowerCase()}</DialogTitle>
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
              quantityLeft === "0" &&
              `${substanceType} will be deleted, if quantity is 0`
            }
            sx={{ marginBottom: "20px" }}
          />
          <Autocomplete
            sx={{ marginBottom: "20px" }}
            options={rooms || []}
            getOptionLabel={(option) =>
              option.room +
              (option.id === substanceLocationDetails.roomId
                ? " (current)"
                : "")
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
                (option.locationId === substanceLocationDetails.locationId
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
              disabled={
                !selectedRoom || !selectedLocation || quantityLeft === ""
              }
            >
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)}>Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReagentEditForm;
