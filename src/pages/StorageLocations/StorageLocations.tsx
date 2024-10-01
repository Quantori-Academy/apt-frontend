import { Paper, Typography } from "@mui/material";
import React from "react";

import { StorageLocationsList, StorageLocationsToolbar } from "@/components";

const StorageLocations: React.FC = () => {
  return (
    <Paper elevation={5} sx={{ padding: 3, borderRadius: 2.5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Storage Locations
      </Typography>

      {/* This toolbar can see only Admin */}
      <StorageLocationsToolbar />

      <StorageLocationsList />
    </Paper>
  );
};

export default StorageLocations;
