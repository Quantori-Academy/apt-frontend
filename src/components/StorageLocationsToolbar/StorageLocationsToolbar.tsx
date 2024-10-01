import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import { DeleteOrEditConfirmationModal } from "../Modal";

const StorageLocationsToolbar: React.FC = () => {
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
    <Box
      sx={{ borderRadius: 2.5, p: 3, border: "2px solid palevioletred", mb: 4 }}
    >
      <h3>This toolbar can see only Admin</h3>
      <Button
        sx={{ color: "primary.main", gap: 1 }}
        onClick={() => handleOpenModal("Create Storage")}
      >
        <AddCircleOutlineSharpIcon />
        Add New Storage Location
      </Button>
      <p>filter/sort</p>

      <DeleteOrEditConfirmationModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        title={modalTitle}
      />
    </Box>
  );
};

export default StorageLocationsToolbar;
