import LinkIcon from "@mui/icons-material/Link";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ActionButtons,
  AlertSnackbar,
  DeleteModal,
  DetailItem,
  PageLoader,
  SmilesImage,
} from "@/components";
import { useDeleteReagentMutation, useGetReagentDetailsQuery } from "@/store";
import { Reagent } from "@/types";

type ReagentKey = keyof Reagent;

type ReagentDetailRow = {
  label: string;
  key: ReagentKey;
};

const reagentDetailsRows: ReagentDetailRow[] = [
  { label: "Reagent ID", key: "reagentID" },
  { label: "Name", key: "name" },
  { label: "Category", key: "category" },
  { label: "CAS Number", key: "CASNumber" },
  { label: "Producer", key: "producer" },
  { label: "Storage location", key: "storageLocation" },
  { label: "Units", key: "units" },
  { label: "Price per unit", key: "pricePerUnit" },
  { label: "Quantity", key: "quantity" },
  { label: "Catalog ID", key: "catalogID" },
];

const ReagentPage = () => {
  const { id: reagentId } = useParams<{ id: string }>();

  const { data: reagentDetails, isLoading } = useGetReagentDetailsQuery(
    reagentId!
  );

  const [deleteReagent] = useDeleteReagentMutation();

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

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

      //I will change this to a constant value once Anahit adds it.
      navigate("/reagent-sample-list");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setSnackbarSeverity("error");
    } finally {
      setIsSnackbarOpen(true);

      setModalIsOpen(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ background: "#0080800f" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Reagent Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {reagentDetailsRows.map(({ label, key }) => (
                <DetailItem
                  key={label}
                  label={label}
                  value={reagentDetails[key]}
                />
              ))}
              <Link
                href={reagentDetails.catalogLink}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LinkIcon sx={{ mr: 1 }} /> Catalog Link
              </Link>
            </Grid>

            <Grid item xs={12} sm={6}>
              <SmilesImage smiles={reagentDetails.structure} />
            </Grid>
          </Grid>
          <DetailItem label="Description" value={reagentDetails.description} />
          <ActionButtons onDelete={() => setModalIsOpen(true)} />
        </CardContent>
      </Card>
      <DeleteModal
        open={modalIsOpen}
        modalTitle=""
        modalText="Are you sure you want to delete this reagent?"
        onClose={() => setModalIsOpen(false)}
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
