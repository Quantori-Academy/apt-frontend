import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { FormsLoadingBox, PageError, SaveCancelButtons } from "@/components";
import { useAlertSnackbar, useLocationDetails } from "@/hooks";
import {
  useGetStorageLocationDetailQuery,
  useGetStorageRoomsQuery,
  useUpdateLocationMutation,
} from "@/store";
import { LocationChangingIds, SubstancesCategory } from "@/types";
import { handleError } from "@/utils";

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

      await updateLocation(updatedDetails).unwrap();
      showSuccess(
        t(
          `substanceDetails.snackBarMessages.${substanceType === "Reagent" ? "reagent.successUpdate" : "sample.successUpdate"}`
        )
      );
      onCancel();
    } catch (error) {
      handleError({ error, t, showError });
    }
  };

  if (isLoading || isSubstanceLocationLoading) {
    return <FormsLoadingBox />;
  }

  if (!rooms || !substanceLocationDetails) {
    return <PageError text="Failed to load locations" />;
  }

  const availableLocations = selectedRoom?.locations || [];

  return (
    <Dialog open onClose={onCancel} fullWidth maxWidth="xs">
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
        <SaveCancelButtons
          saveDisabled={!selectedRoom?.id || !selectedLocation?.locationId}
          onClickCancel={onCancel}
          onClickSave={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SubstanceLocationChangingForm;
