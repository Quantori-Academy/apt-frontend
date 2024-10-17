import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useCreateStorageRoomMutation,
  useGetStorageRoomsQuery,
  useUpdateStorageRoomMutation,
} from "@/store/storageApi";
import { StorageRoomsBrief } from "@/types";

const StorageLocationsList: React.FC = () => {
  const {
    data,
    error,
    isLoading,
    refetch: reFetch,
  } = useGetStorageRoomsQuery();
  const [updateStorageRoom, { isLoading: isUpdating }] =
    useUpdateStorageRoomMutation();
  const [createStorageRoom, { isLoading: isCreating }] =
    useCreateStorageRoomMutation();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [roomIdToEdit, setRoomIdToEdit] = useState<number | null>(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [locationName, setLocationName] = useState<string>("");

  const navigate = useNavigate();

  const handleEditClick = (
    roomId: number,
    room: string,
    description: string
  ) => {
    setRoomIdToEdit(roomId);
    setRoomName(room);
    setRoomDescription(description);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    if (roomIdToEdit !== null) {
      await updateStorageRoom({
        roomId: roomIdToEdit,
        room: roomName,
        description: roomDescription,
      });
      setEditDialogOpen(false);
    }
  };

  const handleCreateSubmit = async () => {
    try {
      await createStorageRoom({
        room_id: selectedRoomId,
        location_name: locationName,
      }).unwrap();
      if (data) {
        reFetch();
        setCreateDialogOpen(false);
        setSelectedRoomId(0);
        setLocationName("");
      }
    } catch (error) {
      console.error("Error creating storage location:", error);
    }
  };

  const handleLocationClick = (locationId: number) => {
    navigate(`/storage/${locationId}`);
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">Error loading storage locations</Typography>
    );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Storage Locations
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateDialogOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        Create New Storage Location
      </Button>

      {data && data.length > 0 ? (
        <List>
          {data.map((room: StorageRoomsBrief) => (
            <Card
              key={room.id}
              style={{
                marginBottom: "20px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {room.room}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {room.description}
                </Typography>

                <Typography
                  variant="subtitle1"
                  style={{ marginTop: "10px", fontWeight: 600 }}
                >
                  Locations:
                </Typography>
                <List
                  style={{
                    paddingLeft: "20px",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {room.locations.map((location) => (
                    <ListItem key={location.location_id} disablePadding>
                      <ListItemButton
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: "8px",
                          padding: "8px 16px",
                          marginBottom: "8px",
                          backgroundColor: "#f5f5f5",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onClick={() =>
                          handleLocationClick(location.location_id)
                        }
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#e0e0e0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#f5f5f5";
                        }}
                      >
                        <Typography variant="body2" color="textPrimary">
                          {location.location_name}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

                <Divider style={{ margin: "10px 0" }} />
                <Typography variant="body2" color="textSecondary">
                  Total Substances: {room.total_substances}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() =>
                    handleEditClick(room.id, room.room, room.description)
                  }
                >
                  Edit Room
                </Button>
              </CardContent>
            </Card>
          ))}
        </List>
      ) : (
        <Typography>No storage rooms available.</Typography>
      )}

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Storage Room</DialogTitle>
        <DialogContent>
          <TextField
            label="Room Name"
            fullWidth
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={roomDescription}
            onChange={(e) => setRoomDescription(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            color="primary"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      >
        <DialogTitle>Create New Storage Location</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Room</InputLabel>
            <Select
              label="Room"
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value as number)}
            >
              <MenuItem value={0} disabled>
                Select a room
              </MenuItem>
              {isLoading ? (
                <MenuItem disabled>Loading rooms...</MenuItem>
              ) : (
                data?.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.room}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <TextField
            label="Location Name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            fullWidth
            margin="normal"
            disabled={selectedRoomId === 0}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateSubmit}
            color="primary"
            disabled={isCreating || selectedRoomId === 0 || locationName === ""}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StorageLocationsList;
