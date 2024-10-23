import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import React from "react";

import { LocationDetails } from "@/types";

type StorageLocationDetailProps = {
  locationDetails: LocationDetails;
};
const StorageLocationDetail: React.FC<StorageLocationDetailProps> = ({
  locationDetails,
}) => {
  return (
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
            <strong>Room Name:</strong> {locationDetails.roomName}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Room ID:</strong> {locationDetails.roomId}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Location Name:</strong> {locationDetails.locationName}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Location ID:</strong> {locationDetails.locationId}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StorageLocationDetail;
