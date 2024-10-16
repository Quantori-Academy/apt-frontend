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

import { SmilesImage } from "@/components";

const reagent = {
  reagentID: "R-00123",
  name: "Acetone",
  category: "Organic Solvent",
  description:
    "A colorless, volatile liquid used as a solvent and for chemical reactions.",
  structure: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
  CASNumber: "67-64-1",
  producer: "Sigma-Aldrich",
  catalogID: "A-12345",
  catalogLink: "https://www.sigmaaldrich.com/catalog/product/sigma/acsgrade",
  units: "Bottle 500 ml",
  pricePerUnit: 50.0,
  quantity: 10,
};

const ReagentPage = () => {
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
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ReagentPage;
