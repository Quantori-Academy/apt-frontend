import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageError, PageLoader } from "@/components";
import AddStorageDialog from "@/components/AddStorageDialog/AddStorageDialog.tsx";
import EditStorage from "@/components/EditStorage/EditStorage.tsx";
import { useGetStorageRoomsQuery } from "@/store/storageApi";
import { StorageRoomsBrief } from "@/types";

const StorageLocationsList: React.FC = () => {
  const {
    data: storages,
    isError,
    isLoading: isGettingStorages,
  } = useGetStorageRoomsQuery();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [roomIdToEdit, setRoomIdToEdit] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleEdit = (roomId: number) => {
    setRoomIdToEdit(roomId);
    setEditDialogOpen(true);
  };

  const handleLocationClick = (locationId: number) => {
    navigate(`/storage/${locationId}`);
  };

  if (isGettingStorages) return <PageLoader />;
  if (isError) return <PageError text={"Failed to get storages"} />;
  if (!storages) return <PageError text="There isn't any storages" />;

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
      <List>
        {storages.map((room: StorageRoomsBrief) => (
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
                  <ListItem key={location.locationId} disablePadding>
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
                      onClick={() => handleLocationClick(location.locationId)}
                    >
                      <Typography variant="body2" color="textPrimary">
                        {location.locationName}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="body2" color="textSecondary">
                Total Substances: {room.totalSubstances}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                onClick={() => handleEdit(room.id)}
              >
                Edit Room
              </Button>
            </CardContent>
          </Card>
        ))}
      </List>
      <EditStorage
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        roomId={roomIdToEdit}
      />
      <AddStorageDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        storages={storages}
      />
    </div>
  );
};

export default StorageLocationsList;
