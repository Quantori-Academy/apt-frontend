import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useDeleteStorageLocationMutation,
  useGetStorageLocationDetailQuery,
  useGetStorageRoomsQuery,
  useMoveSubstanceMutation,
} from "@/store/storageApi.ts";

const StorageLocationDetail: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();

  const { data: rooms, isLoading: isRoomsLoading } = useGetStorageRoomsQuery();

  const [modalIsOpened, setModalIsOpened] = useState(false);

  const [selectedSubstanceId, setSelectedSubstanceId] = useState<number | null>(
    null
  );

  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const roomToMove = rooms?.find((room) => room.room === selectedRoom);

  const handleRoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRoom(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(event.target.value);
  };

  const [moveSubstance] = useMoveSubstanceMutation();

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

  const handleAgreeClick = () => {
    setModalIsOpened(false);
    const locationToMove = roomToMove?.locations.find(
      (location) => location.location_name === selectedLocation
    );

    moveSubstance({
      old_room_id: locationDetails?.room_id as number,
      old_location_id: locationDetails?.location_id as number,
      substance_id: selectedSubstanceId as number,
      new_room_id: roomToMove?.id as number,
      new_location_id: locationToMove?.location_id as number,
    });
  };

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

  if (isLoading || isDeleting || isRoomsLoading) {
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
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={substance.substance_id}
                    divider
                  >
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
                    <Button
                      onClick={() => {
                        setSelectedRoom("");
                        setModalIsOpened(true);
                        setSelectedSubstanceId(substance.substance_id);
                      }}
                    >
                      Change Location
                    </Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No substances stored in this room.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={modalIsOpened}
        onClose={() => setModalIsOpened(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ paddingBottom: "5px" }}>
          {"Change location of this reagent?"}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px !important" }}>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label="Rooms"
              fullWidth
              select
              value={selectedRoom}
              onChange={handleRoomChange}
            >
              {rooms?.map((room) => (
                <MenuItem key={room.id} value={room.room}>
                  {room.room}
                </MenuItem>
              ))}
            </TextField>
            {selectedRoom && (
              <TextField
                sx={{ marginBottom: "15px" }}
                label="Location"
                fullWidth
                select
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                {roomToMove?.locations
                  .filter(
                    (location) =>
                      location.location_name !== locationDetails.location_name
                  )
                  .map((location) => (
                    <MenuItem
                      key={location.location_id}
                      value={location.location_name}
                    >
                      {location.location_name}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalIsOpened(false)}>Cancel</Button>
          <Button
            disabled={!selectedLocation}
            onClick={handleAgreeClick}
            autoFocus
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!errorMessage || !!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={errorMessage ? "error" : "success"}
        >
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StorageLocationDetail;
