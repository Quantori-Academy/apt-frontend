import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { PageLoader, SaveCancelButtons } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useChooseLocationMutation, useGetStorageRoomsQuery } from "@/store";
import { RoomLocationBrief, StorageRoomsBrief } from "@/types";
import { handleError } from "@/utils";

type ChooseReagentsLocationFormProps = {
  orderId: string;
  selectedReagents: number[];
  onAllocation: () => void;
  onClose: () => void;
};

const ChooseReagentsLocationForm: React.FC<ChooseReagentsLocationFormProps> = ({
  orderId,
  selectedReagents,
  onAllocation,
  onClose,
}) => {
  const { t } = useTranslation();

  const { data: rooms, isLoading: isStorageLoading } =
    useGetStorageRoomsQuery();

  const { showSuccess, showError } = useAlertSnackbar();

  const [selectedRoom, setSelectedRoom] = useState<StorageRoomsBrief | null>(
    null
  );

  const [selectedLocation, setSelectedLocation] =
    useState<RoomLocationBrief | null>(null);

  const [chooseLocation] = useChooseLocationMutation();

  if (isStorageLoading) {
    return <PageLoader />;
  }

  const handleSubmit = async () => {
    try {
      await chooseLocation({
        orderId: orderId,
        locationId: selectedLocation!.locationId,
        reagentIds: selectedReagents,
      }).unwrap();
      showSuccess(t("orders.snackBarMessages.allocated"));
    } catch (error) {
      handleError({ error, t, showError });
    } finally {
      onAllocation();
      onClose();
    }
  };
  return (
    <>
      <Autocomplete
        sx={{ margin: "20px 0 " }}
        options={rooms || []}
        getOptionLabel={(option) => option.room}
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
          options={selectedRoom.locations}
          getOptionLabel={(option) => option.locationName}
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
        saveDisabled={!selectedRoom || !selectedLocation}
        onClickCancel={onClose}
        onClickSave={handleSubmit}
      />
    </>
  );
};

export default ChooseReagentsLocationForm;
