import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ChangeLocationDialog,
  PageError,
  PageLoader,
  StorageLocationDetail,
  StoredSubstances,
} from "@/components";
import { DashboardBreadcrumbs } from "@/components/DashboardBreadcrumbs";
import { useAlertSnackbar } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig.tsx";
import {
  useDeleteStorageLocationMutation,
  useGetStorageLocationDetailQuery,
} from "@/store";

const StorageLocationDetails: React.FC = () => {
  const [selectedSubstanceId, setSelectedSubstanceId] = useState("");
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const { openSnackbar, SnackbarComponent } = useAlertSnackbar();

  const {
    data: locationDetails,
    isError,
    isLoading,
  } = useGetStorageLocationDetailQuery(locationId!);

  const [deleteStorageLocation, { isLoading: isDeleting }] =
    useDeleteStorageLocationMutation();

  const [modalIsOpened, setModalIsOpened] = useState(false);

  const handleDelete = async () => {
    if (locationDetails?.substances.length === 0) {
      const { error } = await deleteStorageLocation(Number(locationId));

      if (!error) {
        openSnackbar("success", "Storage location deleted successfully.");
        navigate(RouteProtectedPath.storageLocation);
      } else {
        openSnackbar("error", "Failed to delete storage location");
      }
    } else {
      openSnackbar(
        "error",
        "You can't delete this storage location because it contains substances."
      );
    }
  };

  const handleChangeLocation = (substanceId: string) => {
    setSelectedSubstanceId(substanceId);
  };

  if (isLoading || isDeleting) return <PageLoader />;
  if (!locationDetails) return <PageError text="there is no location here" />;
  if (isError) return <PageError text="Failed to get location" />;

  return (
    <Box padding={4}>
      <DashboardBreadcrumbs />
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
            {locationDetails.roomName} - {locationDetails.locationName}
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
        <StorageLocationDetail locationDetails={locationDetails} />
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
            <StoredSubstances
              substances={locationDetails.substances}
              onChangeLocation={handleChangeLocation}
              openModal={() => setModalIsOpened(true)}
            />
          </Paper>
        </Grid>
      </Grid>
      <ChangeLocationDialog
        open={modalIsOpened}
        onClose={() => setModalIsOpened(false)}
        locationDetails={locationDetails}
        selectedSubstanceId={selectedSubstanceId}
      />
      {SnackbarComponent()}
    </Box>
  );
};

export default StorageLocationDetails;
