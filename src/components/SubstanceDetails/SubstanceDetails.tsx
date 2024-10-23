import { Container } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
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

  const substanceTypeInLowerCase = substanceType.toLowerCase();

  if (!substanceLocationDetails) {
    return (
      <PageError text={`Failed to load ${substanceTypeInLowerCase} details.`} />
    );
  }

  const handleDelete = async () => {
    try {
      await deleteSubstance(substanceId).unwrap();

      openSnackbar(
        "success",
        `${substanceTypeInLowerCase} deleted successfully!`
      );

      navigate(redirectPath);
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        openSnackbar("error", errorMessage);
      } else {
        openSnackbar("error", "An unexpected error occurred");
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
        modalText={`Are you sure you want to delete this ${substanceTypeInLowerCase}?`}
        onClose={() => setDeleteModalIsOpen(false)}
        onDelete={handleDelete}
      />

      {SnackbarComponent()}
    </Container>
  );
};

export default SubstanceDetails;
