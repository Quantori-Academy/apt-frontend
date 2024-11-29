import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { FormsLoadingBox, PageError } from "@/components";
import { useAlertSnackbar, useLocationDetails } from "@/hooks";
import {
  useGetStorageLocationDetailQuery,
  useGetStorageRoomsQuery,
  useUpdateLocationMutation,
} from "@/store";
import { LocationChangingIds, SubstancesCategory } from "@/types";

type LocationChangingProps = {
  locationIdsToChange: LocationChangingIds;
  substanceType: SubstancesCategory;
  onCancel: () => void;
};

const SubstanceLocationChangingForm: React.FC<LocationChangingProps> = ({
  locationIdsToChange,
  substanceType,
  onCancel,
}) => {
  const { t } = useTranslation();

  const { data: rooms, isLoading } = useGetStorageRoomsQuery();

  const { showSuccess, showError } = useAlertSnackbar();

  const {
    data: substanceLocationDetails,
    isLoading: isSubstanceLocationLoading,
  } = useGetStorageLocationDetailQuery(
    String(locationIdsToChange.currentLocationId)
  );

  const {
    selectedRoom,
    selectedLocation,
    setSelectedRoom,
    setSelectedLocation,
  } = useLocationDetails({ substanceLocationDetails, rooms });

  const [updateLocation] = useUpdateLocationMutation();

  const handleSubmit = async () => {
    try {
      const updatedDetails = {
        newLocationId: Number(selectedLocation!.locationId),
        storageContentId: locationIdsToChange.storageContentId as number,
      };

      await updateLocation(updatedDetails);
      showSuccess(
        t(
          `substanceDetails.snackBarMessages.${substanceType === "Reagent" ? "reagent.successUpdate" : "sample.successUpdate"}`
        )
      );
      onCancel();
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        showError(errorMessage);
      } else {
        showError(t("substanceDetails.snackBarMessages.unexpectedError"));
      }
    }
  };

  if (isLoading || isSubstanceLocationLoading) {
    return <FormsLoadingBox />;
  }

  if (!rooms || !substanceLocationDetails) {
    return <PageError text="Failed to load locations" />;
  }

  const availableLocations = selectedRoom ? selectedRoom.locations : [];

  return (
    <Dialog open onClose={onCancel} maxWidth="sm">
      <DialogTitle>
        {t(
          `substanceDetails.title.${substanceType === "Reagent" ? "editReagent" : "editSample"}`
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          "&.MuiDialogContent-root": {
            paddingTop: "10px",
          },
        }}
      >
        <Autocomplete
          sx={{ marginBottom: "20px" }}
          options={rooms || []}
          getOptionLabel={(option) =>
            option.room +
            (option.id == substanceLocationDetails.roomId
              ? t("substanceDetails.currentLocation")
              : "")
          }
          value={selectedRoom}
          onChange={(_, newRoom) => {
            setSelectedLocation(null);
            setSelectedRoom(newRoom);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("substanceDetails.fields.room")}
              variant="outlined"
            />
          )}
        />
        {selectedRoom && (
          <Autocomplete
            sx={{ marginBottom: "25px" }}
            options={availableLocations}
            getOptionLabel={(option) =>
              option.locationName +
              (option.locationId == substanceLocationDetails.locationId
                ? t("substanceDetails.currentLocation")
                : "")
            }
            value={selectedLocation}
            onChange={(_, newLocation) => {
              setSelectedLocation(newLocation);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("substanceDetails.fields.location")}
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
            disabled={!selectedRoom?.id || !selectedLocation?.locationId}
          >
            {t("substanceDetails.buttons.saveChanges")}
          </Button>
          <Button onClick={onCancel}>{t("buttons.cancel")}</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SubstanceLocationChangingForm;
