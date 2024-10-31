import { Container } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  ConfirmRemoving,
  PageError,
  PageLoader,
  ReagentDetails,
  ReagentEditForm,
  SampleDetails,
} from "@/components";
import { useAlertSnackbar } from "@/hooks";
import {
  useDeleteSubstanceMutation,
  useGetStorageLocationDetailQuery,
} from "@/store";
import { Reagent, Sample, SubstancesCategory } from "@/types";

type Substance = Reagent | Sample;

type SubstanceDetailsProps = {
  substanceType: SubstancesCategory;
  substanceId: string;
  substanceDetails: Substance;
  redirectPath: string;
};

const SubstanceDetails: React.FC<SubstanceDetailsProps> = ({
  substanceType,
  substanceDetails,
  substanceId,
  redirectPath,
}) => {
  const { t } = useTranslation();

  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: substanceLocationDetails,
    isLoading: isSubstanceLocationLoading,
  } = useGetStorageLocationDetailQuery(
    substanceDetails ? substanceDetails.locationId : skipToken
  );

  const navigate = useNavigate();

  const [deleteSubstance] = useDeleteSubstanceMutation();

  if (isSubstanceLocationLoading) {
    return <PageLoader />;
  }

  if (!substanceLocationDetails) {
    return (
      <PageError
        text={t(
          `substanceDetails.errors.${substanceType === "Reagent" ? "reagentLoadError" : "sampleLoadError"}`
        )}
      />
    );
  }

  const handleDelete = async () => {
    try {
      await deleteSubstance(substanceId).unwrap();

      openSnackbar(
        "success",
        t(
          `substanceDetails.snackBarMessages.${substanceType === "Reagent" ? "reagent.success" : "sample.success"}`
        )
      );

      navigate(redirectPath);
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        openSnackbar("error", errorMessage);
      } else {
        openSnackbar(
          "error",
          t("substanceDetails.snackBarMessages.unexpectedError")
        );
      }
    } finally {
      setDeleteModalIsOpen(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {substanceType === "Reagent" ? (
        <ReagentDetails
          reagentDetails={substanceDetails as Reagent}
          reagentLocationDetails={substanceLocationDetails}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          setIsEditing={setIsEditing}
        />
      ) : (
        <SampleDetails
          sampleDetails={substanceDetails as Sample}
          sampleLocationDetails={substanceLocationDetails}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          setIsEditing={setIsEditing}
        />
      )}
      {isEditing && (
        <ReagentEditForm
          openSnackbar={openSnackbar}
          substanceType={substanceType}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          substanceDetails={substanceDetails}
          substanceLocationDetails={substanceLocationDetails}
        />
      )}
      <ConfirmRemoving
        open={deleteModalIsOpen}
        modalTitle=""
        modalText={t("substances.modalMessages.confirmDelete")}
        onClose={() => setDeleteModalIsOpen(false)}
        onDelete={handleDelete}
      />

      {SnackbarComponent()}
    </Container>
  );
};

export default SubstanceDetails;
