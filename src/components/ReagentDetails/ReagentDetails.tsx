import LinkIcon from "@mui/icons-material/Link";
import { Card, CardContent, Grid, Link, Typography } from "@mui/material";

import { DetailItem, EditDeleteButtons, SmilesImage } from "@/components";
import { Reagent, RoomData } from "@/types";

type ReagentKey = keyof Reagent;

type ReagentDetailRow = {
  label: string;
  key: ReagentKey;
};

const reagentDetailsRows: ReagentDetailRow[] = [
  { label: "Reagent ID", key: "substanceId" },
  { label: "Name", key: "name" },
  { label: "Category", key: "category" },
  { label: "CAS Number", key: "CASNumber" },
  { label: "Producer", key: "producer" },
  { label: "Storage location", key: "locationId" },
  { label: "Units", key: "unit" },
  { label: "Price per unit", key: "pricePerUnit" },
  { label: "Quantity left", key: "totalQuantityLeft" },
  { label: "Catalog ID", key: "catalogID" },
  { label: "Description", key: "description" },
];

type ReagentDetailsProps = {
  reagentDetails: Reagent;
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  reagentLocationDetails: RoomData;
};

const ReagentDetails: React.FC<ReagentDetailsProps> = ({
  reagentDetails,
  setDeleteModalIsOpen,
  setIsEditing,
  reagentLocationDetails,
}) => {
  return (
    <Card sx={{ background: "#0080800f" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Reagent Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {reagentDetailsRows.map(({ label, key }) =>
              key !== "locationId" ? (
                <DetailItem
                  key={label}
                  label={label}
                  value={reagentDetails[key]}
                />
              ) : (
                <DetailItem
                  key={label}
                  label={label}
                  value={`${reagentLocationDetails.roomName}, ${reagentLocationDetails.locationName}`}
                />
              )
            )}
            <Link
              href={reagentDetails.catalogLink}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LinkIcon sx={{ mr: 1 }} /> Catalog Link
            </Link>
          </Grid>

          <Grid item xs={12} sm={6}>
            <SmilesImage smiles={reagentDetails.structure} />
          </Grid>
        </Grid>
        <EditDeleteButtons
          onDelete={() => setDeleteModalIsOpen(true)}
          onEdit={() => setIsEditing(true)}
        />
      </CardContent>
    </Card>
  );
};

export default ReagentDetails;
