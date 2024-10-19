import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  AlertSnackbar,
  ConfirmRemoving,
  PageLoader,
  ReagentDetails,
  ReagentEditForm,
} from "@/components";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { useDeleteReagentMutation, useGetReagentDetailsQuery } from "@/store";

const ReagentPage = () => {
  const { id: reagentId } = useParams<{ id: string }>();

  const { data: reagentDetails, isLoading } = useGetReagentDetailsQuery(
    reagentId!
  );

  const [deleteReagent] = useDeleteReagentMutation();

  const navigate = useNavigate();

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [isEditing, setIsEditing] = useState(false);
  if (isLoading) {
    return <PageLoader />;
  }

  if (!reagentDetails) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Failed to load reagent details. Please try again later.
        </Typography>
      </Container>
    );
  }

  const handleDelete = async () => {
    try {
      await deleteReagent(reagentId).unwrap();

      setSnackbarSeverity("success");

      navigate(RouteProtectedPath.reagentSampleList);
    } catch {
      setSnackbarSeverity("error");
    } finally {
      setIsSnackbarOpen(true);

      setDeleteModalIsOpen(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <ReagentDetails
        reagentDetails={reagentDetails}
        setDeleteModalIsOpen={setDeleteModalIsOpen}
        setIsEditing={setIsEditing}
      />
      {isEditing && (
        <ReagentEditForm
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          reagentDetails={reagentDetails}
        />
      )}
      <ConfirmRemoving
        open={deleteModalIsOpen}
        modalTitle=""
        modalText="Are you sure you want to delete this reagent?"
        onClose={() => setDeleteModalIsOpen(false)}
        onDelete={handleDelete}
      />
      <AlertSnackbar
        severity={snackbarSeverity}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
      >
        {snackbarSeverity === "success"
          ? "Reagent deleted successfully!"
          : "Failed to delete reagent!"}
      </AlertSnackbar>
    </Container>
  );
};

export default ReagentPage;
