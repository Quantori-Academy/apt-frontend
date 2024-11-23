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
import { useNavigate } from "react-router-dom";

import { PageLoader } from "@/components";
import { useAlertSnackbar, useLocationQuantityDetails } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import {
  useDeleteSubstanceMutation,
  useGetStorageRoomsQuery,
  useUpdateSubstanceMutation,
} from "@/store";
import { Reagent, RoomData, Sample, SubstancesCategory } from "@/types";

type ReagentEditFormProps = {
  substanceType: SubstancesCategory;
  isChangingQuantity: boolean;
  isChangingLocation: boolean;
  substanceDetails: Reagent | Sample;
  substanceLocationDetails: RoomData;
  onCancel: () => void;
};

const ReagentEditForm: React.FC<ReagentEditFormProps> = ({
  isChangingQuantity,
  isChangingLocation,
  substanceDetails,
  substanceLocationDetails,
  substanceType,
  onCancel,
}) => {
  const { t } = useTranslation();

  const { data: rooms, isLoading } = useGetStorageRoomsQuery();

  const { showSuccess, showError } = useAlertSnackbar();

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

        showSuccess(
          t(
            `substanceDetails.snackBarMessages.${substanceType === "Reagent" ? "reagent.successDelete" : "sample.successDelete"}`
          )
        );

        navigate(RouteProtectedPath.substances);
      } else {
        const updatedDetails = {
          id: substanceDetails.substanceId,
          oldLocationId: substanceLocationDetails.locationId,
          quantity: quantityLeft,
          newLocationId: selectedLocation?.locationId,
        };

        await updateSubstance(updatedDetails);
        showSuccess(
          t(
            `substanceDetails.snackBarMessages.${substanceType === "Reagent" ? "reagent.successUpdate" : "sample.successUpdate"}`
          )
        );
        onCancel();
      }
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

  const availableLocations = selectedRoom ? selectedRoom.locations : [];

  return (
    <>
      <Dialog
        open={isChangingQuantity || isChangingLocation}
        onClose={onCancel}
        maxWidth="sm"
      >
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
          {isChangingQuantity && (
            <TextField
              label={t("substanceDetails.fields.totalQuantityLeft")}
              variant="outlined"
              value={quantityLeft}
              inputProps={{ min: 0 }}
              onChange={(event) => setQuantityLeft(event.target.value)}
              type="number"
              fullWidth
              error={quantityLeft === "0"}
              sx={{
                marginBottom: "20px",
                "& .MuiOutlinedInput-root.Mui-error": {
                  "& fieldset": {
                    borderColor: "#B8860B",
                  },
                },
                "& .MuiFormHelperText-root.Mui-error": {
                  color: "#B8860B",
                },
              }}
              helperText={
                quantityLeft === "0" && t("substanceDetails.quantityWarning")
              }
            />
          )}
          {isChangingLocation && (
            <>
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
            </>
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
              {t("substanceDetails.buttons.saveChanges")}
            </Button>
            <Button onClick={onCancel}>{t("buttons.cancel")}</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReagentEditForm;
