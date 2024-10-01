import { Box } from "@mui/material";
import React, { useState } from "react";

import {
  DeleteOrEditConfirmationModal,
  StorageLocationItem,
} from "@/components";

const StorageLocationsList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleOpenModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <StorageLocationItem openModal={handleOpenModal} />

      <DeleteOrEditConfirmationModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        title={modalTitle}
      />
    </Box>
  );
};

export default StorageLocationsList;
