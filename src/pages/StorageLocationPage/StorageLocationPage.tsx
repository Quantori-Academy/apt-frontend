import { Paper, Typography } from "@mui/material";
import React from "react";

import { GoBack } from "@/components";

const StorageLocationPage: React.FC = () => {
  return (
    <Paper elevation={5} sx={{ padding: 3, borderRadius: 2.5 }}>
      <div>
        <GoBack />
        <Typography gutterBottom variant="h4" component="div">
          Name: Storage location name
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Room: Storage location room
        </Typography>
        <Typography variant="body2">
          Description: Storage location description
        </Typography>
      </div>
    </Paper>
  );
};

export default StorageLocationPage;
