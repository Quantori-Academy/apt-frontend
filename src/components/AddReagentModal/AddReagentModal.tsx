import { Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { AddReagentForm, BasicModal } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useCreateReagentMutation, useGetStorageRoomsQuery } from "@/store";
import { ReagentData } from "@/types";

const AddReagentModal: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const { data: storageRooms } = useGetStorageRoomsQuery();
  const [createReagent] = useCreateReagentMutation();
  const { showSuccess, showError } = useAlertSnackbar();

  const handleCreateReagent = async (reagentData: ReagentData) => {
    try {
      const payload = {
        ...reagentData,
        structure: reagentData.structure || null,
      };

      await createReagent(payload).unwrap();
      showSuccess(t("addSubstanceForm.snackBarMessages.reagent.success"));
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding reagent:", error);
      showError(t("addSubstanceForm.snackBarMessages.reagent.error"));
    }
  };

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const locationOptions =
    storageRooms?.flatMap((room) =>
      room.locations.map((location) => ({
        id: location.locationId,
        label: `${room.room} - ${location.locationName}`,
      }))
    ) || [];

  return (
    <div>
      <Button variant="contained" onClick={handleOpenModal}>
        {t("substances.buttons.addReagent")}
      </Button>

      <BasicModal
        title={t("addSubstanceForm.title.reagent")}
        isOpen={isOpen}
        closeModal={handleCloseModal}
        width="700px"
        height="600px"
      >
        <AddReagentForm
          handleCreateReagent={handleCreateReagent}
          locationOptions={locationOptions}
        />
      </BasicModal>
    </div>
  );
};

export default AddReagentModal;
