import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";

import { PageError, PageLoader, StorageLocationsList } from "@/components";
import AddStorageDialog from "@/components/AddStorageDialog/AddStorageDialog.tsx";
import EditStorage from "@/components/EditStorage/EditStorage.tsx";
import { useGetStorageRoomsQuery } from "@/store";

const StoragePage: React.FC = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [roomIdToEdit, setRoomIdToEdit] = useState<number | null>(null);

  const {
    data: storages,
    isError,
    isLoading: isGettingStorages,
  } = useGetStorageRoomsQuery();

  const handleEdit = (roomId: number) => {
    setRoomIdToEdit(roomId);
    setEditDialogOpen(true);
  };
  if (isGettingStorages) return <PageLoader />;
  if (isError) return <PageError text={"Failed to get storages"} />;
  if (!storages) return <PageError text="There isn't any storages" />;

  return (
    <Container>
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
        <StorageLocationsList storages={storages} onEditRoom={handleEdit} />

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
    </Container>
  );
};

export default StoragePage;
