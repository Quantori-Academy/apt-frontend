import { Container } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ConfirmRemoving,
  PageLoader,
  ReagentDetails,
  ReagentEditForm,
} from "@/components";
import { PageError } from "@/components/PageError";
import { useAlertSnackbar } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import {
  useDeleteReagentMutation,
  useGetReagentDetailsQuery,
  useGetStorageLocationDetailQuery,
} from "@/store";

const ReagentPage = () => {
  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { id: reagentId } = useParams<{ id: string }>();
  const { data: reagentDetails, isLoading: isReagentLoading } =
    useGetReagentDetailsQuery(reagentId!);

  const { data: reagentLocationDetails, isLoading: isReagentLocationLoading } =
    useGetStorageLocationDetailQuery(reagentDetails?.locationId as number, {
      skip: !reagentDetails?.locationId,
    });

  const navigate = useNavigate();

  const [deleteReagent] = useDeleteReagentMutation();

  if (isReagentLoading || isReagentLocationLoading) {
    return <PageLoader />;
  }

  if (!reagentDetails || !reagentLocationDetails) {
    return (
      <PageError
        text={"Failed to load reagent details. Please try again later."}
      />
    );
  }

  const handleDelete = async () => {
    try {
      await deleteReagent(reagentId).unwrap();

      openSnackbar("success", "Reagent deleted successfully!");

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
      <ReagentDetails
        reagentDetails={reagentDetails}
        setDeleteModalIsOpen={setDeleteModalIsOpen}
        setIsEditing={setIsEditing}
        reagentLocationDetails={reagentLocationDetails}
      />
      {isEditing && (
        <ReagentEditForm
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          reagentDetails={reagentDetails}
          reagentLocationDetails={reagentLocationDetails}
        />
      )}
      <ConfirmRemoving
        open={deleteModalIsOpen}
        modalTitle=""
        modalText="Are you sure you want to delete this reagent?"
        onClose={() => setDeleteModalIsOpen(false)}
        onDelete={handleDelete}
      />

      {SnackbarComponent()}
    </Container>
  );
};

export default ReagentPage;
