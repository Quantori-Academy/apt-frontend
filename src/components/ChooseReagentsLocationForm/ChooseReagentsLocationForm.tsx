import { Autocomplete, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Severity } from "@/hooks";
import { useChooseLocationMutation, useGetStorageRoomsQuery } from "@/store";
import { RoomLocationBrief, StorageRoomsBrief } from "@/types";

import { PageLoader } from "../PageLoader";
import { SaveCancelButtons } from "../SaveCancelButtons";

type ChooseReagentsLocationFormProps = {
  onClose: () => void;
  orderId: string;
  openSnackbar: (severity: Severity, text: string) => void;
};

const ChooseReagentsLocationForm: React.FC<ChooseReagentsLocationFormProps> = ({
  onClose,
  orderId,
  openSnackbar,
}) => {
  const { t } = useTranslation();

  const { data: rooms, isLoading: isStorageLoading } =
    useGetStorageRoomsQuery();

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
    const { error } = await chooseLocation({
      orderId: orderId,
      locationId: selectedLocation!.locationId,
    });
    if (error) {
      openSnackbar(
        "error",
        t("substanceDetails.snackBarMessages.unexpectedError")
      );
    } else {
      openSnackbar("success", t("orders.snackBarMessages.editing.success"));
    }
    onClose();
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
      <Stack direction="row" spacing={1}>
        <SaveCancelButtons
          saveText={t("buttons.save")}
          saveDisabled={!selectedRoom || !selectedLocation}
          cancelText={t("buttons.cancel")}
          onClickCancel={onClose}
          onClickSave={handleSubmit}
        />
      </Stack>
    </>
  );
};

export default ChooseReagentsLocationForm;
