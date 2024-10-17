import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useDeleteStorageLocationMutation,
  useGetStorageLocationDetailQuery,
} from "@/store/storageApi.ts";

const StorageLocationDetail: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();

  const {
    data: locationDetails,
    error,
    isLoading,
  } = useGetStorageLocationDetailQuery(Number(locationId));
  const [deleteStorageLocation, { isLoading: isDeleting }] =
    useDeleteStorageLocationMutation();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const handleDelete = async () => {
    if (locationDetails?.substances.length === 0) {
      try {
        await deleteStorageLocation(Number(locationId));
        setSuccessMessage("Storage location deleted successfully.");
        setTimeout(() => navigate("/storage"), 2000);
      } catch (error) {
        console.error("Failed to delete storage location:", error);
      }
    } else {
      setErrorMessage(
        "You can't delete this storage location because it contains substances."
      );
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  if (isLoading || isDeleting) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error" variant="h6">
          Failed to fetch storage location details.
        </Typography>
      </Box>
    );
  }

  if (!locationDetails) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">
          No details available for this location.
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={4}>
      <Grid container spacing={4} direction="column">
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, color: "#333" }}
          >
            {locationDetails.room_name} - {locationDetails.location_name}
          </Typography>

          <Box display="flex" alignItems="center">
            <IconButton
              onClick={handleDelete}
              color="error"
              aria-label="delete"
              disabled={isDeleting}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 3,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              padding: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Location Details
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant="body1" paragraph>
                <strong>Room Name:</strong> {locationDetails.room_name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Room ID:</strong> {locationDetails.room_id}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Location Name:</strong> {locationDetails.location_name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Location ID:</strong> {locationDetails.location_id}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              borderRadius: 3,
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Stored Substances
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            {locationDetails.substances.length > 0 ? (
              <List sx={{ maxHeight: "300px", overflowY: "auto", padding: 0 }}>
                {locationDetails.substances.map((substance) => (
                  <ListItem key={substance.substance_id} divider>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {substance.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Description:</strong>{" "}
                            {substance.description}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Structure (SMILES):</strong>{" "}
                            {substance.structure_smiles}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No substances stored in this room.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default StorageLocationDetail;
