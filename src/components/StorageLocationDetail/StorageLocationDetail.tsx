import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { LocationDetails } from "@/types";

type StorageLocationDetailProps = {
  locationDetails: LocationDetails;
};
const StorageLocationDetail: React.FC<StorageLocationDetailProps> = ({
  locationDetails,
}) => {
  const { t } = useTranslation();

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
            {t("storage.title.location")}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="body1" paragraph>
            <strong>{t("storage.requiredFields.roomName.label")}:</strong>{" "}
            {locationDetails.roomName}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>{t("storage.fields.roomId")}:</strong>{" "}
            {locationDetails.roomId}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>{t("storage.fields.locationName")}:</strong>{" "}
            {locationDetails.locationName}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>{t("storage.fields.locationId")}:</strong>{" "}
            {locationDetails.locationId}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StorageLocationDetail;
