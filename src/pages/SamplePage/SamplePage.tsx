import { Container } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ConfirmRemoving,
  PageError,
  PageLoader,
  SampleDetails,
} from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import {
  useDeleteSampleMutation,
  useGetSampleDetailsQuery,
  useGetStorageLocationDetailQuery,
} from "@/store";

const SamplePage: React.FC = () => {
  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { id: sampleId } = useParams<{ id: string }>();
  const {
    data: sampleDetails,
    isError,
    isLoading: isSampleLoading,
  } = useGetSampleDetailsQuery(sampleId ? sampleId : skipToken);

  const { data: sampleLocationDetails, isLoading: isSampleLocationLoadiong } =
    useGetStorageLocationDetailQuery(
      sampleDetails ? sampleDetails.locationId : skipToken
    );

  const navigate = useNavigate();

  const [deleteSample] = useDeleteSampleMutation();

  if (isSampleLoading || isSampleLocationLoadiong) {
    return <PageLoader />;
  }

  if (!sampleDetails || !sampleLocationDetails || !sampleId || isError) {
    return (
      <PageError
        text={"Failed to load sample details. Please try again later."}
      />
    );
  }

  const handleDelete = async () => {
    try {
      await deleteSample(sampleId).unwrap();

      openSnackbar("success", "Sample deleted successfully!");

      navigate(RouteProtectedPath.reagentSampleList);
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
      <SampleDetails
        sampleDetails={sampleDetails}
        sampleLocationDetails={sampleLocationDetails}
        setDeleteModalIsOpen={setDeleteModalIsOpen}
        setIsEditing={setIsEditing}
      />
      <ConfirmRemoving
        open={deleteModalIsOpen}
        modalTitle=""
        modalText="Are you sure you want to delete this sample?"
        onClose={() => setDeleteModalIsOpen(false)}
        onDelete={handleDelete}
      />
      {isEditing && null}
      {SnackbarComponent()}
    </Container>
  );
};

export default SamplePage;
