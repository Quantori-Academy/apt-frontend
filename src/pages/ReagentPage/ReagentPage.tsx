import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ConfirmRemoving, PageLoader, ReagentDetails } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { useDeleteSubstanceMutation, useGetReagentDetailsQuery } from "@/store";

const ReagentPage = () => {
  const { id: reagentId } = useParams<{ id: string }>();

  const { data: reagentDetails, isLoading } = useGetReagentDetailsQuery(
    reagentId!
  );

  const [deleteReagent] = useDeleteSubstanceMutation();

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

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

      openSnackbar("success", "Reagent deleted successfully!");

      navigate(RouteProtectedPath.substances);
    } catch {
      openSnackbar("error", "Failed to delete reagent!");
    } finally {
      setModalIsOpen(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <ReagentDetails
        reagentDetails={reagentDetails}
        setModalIsOpen={setModalIsOpen}
      />
      <ConfirmRemoving
        open={modalIsOpen}
        modalTitle=""
        modalText="Are you sure you want to delete this reagent?"
        onClose={() => setModalIsOpen(false)}
        onDelete={handleDelete}
      />

      {SnackbarComponent()}
    </Container>
  );
};

export default ReagentPage;
