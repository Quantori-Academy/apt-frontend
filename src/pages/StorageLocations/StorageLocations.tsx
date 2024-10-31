import { Box, Button, Container, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AddStorageDialog,
  EditStorage,
  PageError,
  PageLoader,
  StorageLocationsList,
} from "@/components";
import { DashboardBreadcrumbs } from "@/components/DashboardBreadcrumbs";
import { useGetStorageRoomsQuery } from "@/store";
import { paginateStorages } from "@/utils";

import style from "./StorageLocations.module.css";

const PAGE_SIZE = 3;

const StorageLocations: React.FC = () => {
  const { t } = useTranslation();

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
  if (isError) return <PageError text={t("storage.errors.storageLoadError")} />;
  if (!storages)
    return <PageError text={t("storage.errors.emptyStorageError")} />;

  const totalPages = Math.ceil(storages.length / PAGE_SIZE);
  const paginatedStorages = paginateStorages(storages, page, PAGE_SIZE);

  return (
    <Container sx={{ padding: "20px" }}>
      <DashboardBreadcrumbs />
      <Typography variant="h3" sx={{ marginBottom: "30px" }}>
        {t("storage.title.storage")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateDialogOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        {t("storage.buttons.createLocation")}
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
