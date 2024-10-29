import { Box, Button, Container, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";

import {
  AddStorageDialog,
  EditStorage,
  PageError,
  PageLoader,
  StorageLocationsList,
} from "@/components";
import { useGetStorageRoomsQuery } from "@/store";
import { paginateStorages } from "@/utils";

import style from "./StorageLocations.module.css";

const PAGE_SIZE = 3;

const StorageLocations: React.FC = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [roomIdToEdit, setRoomIdToEdit] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: storages,
    isError,
    isLoading: isGettingStorages,
  } = useGetStorageRoomsQuery();

  const handleEdit = (roomId: string) => {
    setRoomIdToEdit(roomId);
    setEditDialogOpen(true);
  };

  if (isGettingStorages) return <PageLoader />;
  if (isError) return <PageError text="Failed to get storages" />;
  if (!storages) return <PageError text="There isn't any storages" />;

  const totalPages = Math.ceil(storages.length / PAGE_SIZE);
  const paginatedStorages = paginateStorages(storages, page, PAGE_SIZE);

  return (
    <Container sx={{ padding: "20px" }}>
      <Typography variant="h3" marginBottom="30px">
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
      <StorageLocationsList
        storages={paginatedStorages}
        onEditRoom={handleEdit}
      />

      <EditStorage
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        id={roomIdToEdit}
      />
      <AddStorageDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        storages={storages}
      />
      <Box className={style.pagination}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </Box>
    </Container>
  );
};

export default StorageLocations;
