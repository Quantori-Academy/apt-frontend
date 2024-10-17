import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { DeleteModal, SmilesImage } from "@/components";
import { reagent } from "@/mockData/reagent";

const ReagentPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };
  const handleDelete = () => {
    console.log("delete");
    setModalIsOpen(false);
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
              <Typography>
                <strong>Reagent ID:</strong> {reagent.reagentID}
              </Typography>
              <Typography>
                <strong>Name:</strong> {reagent.name}
              </Typography>
              <Typography>
                <strong>Category:</strong> {reagent.category}
              </Typography>
              <Typography>
                <strong>CAS Number:</strong> {reagent.CASNumber}
              </Typography>
              <Typography>
                <strong>Producer:</strong> {reagent.producer}
              </Typography>
              <Typography>
                <strong>Catalog ID:</strong> {reagent.catalogID}
              </Typography>

              <Link
                href={reagent.catalogLink}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LinkIcon sx={{ mr: 1 }} /> Catalog Link
              </Link>
              <Typography>
                <strong>Storage location:</strong> {reagent.storageLocation}
              </Typography>
              <Typography>
                <strong>Units:</strong> {reagent.units}
              </Typography>
              <Typography>
                <strong>Price per unit:</strong> ${reagent.pricePerUnit}
              </Typography>
              <Typography>
                <strong>Quantity:</strong> {reagent.quantity}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <SmilesImage smiles={reagent.structure} />
            </Grid>
          </Grid>
          <Typography>
            <strong>Description:</strong> {reagent.description}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleOpen}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <DeleteModal
        open={modalIsOpen}
        modalTitle=""
        modalText="Are you sure you want to delete this reagent?"
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default ReagentPage;
