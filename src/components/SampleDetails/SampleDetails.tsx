import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

import { DetailItem, SmilesImage } from "@/components";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { RoomData, Sample } from "@/types";

type SampleKey = keyof Sample;

type ReagentDetailRow = {
  label: string;
  key: SampleKey;
};

const sampleDetailsRows: ReagentDetailRow[] = [
  { label: "Reagent ID", key: "substanceId" },
  { label: "Name", key: "name" },
  { label: "Category", key: "category" },
  { label: "Substances", key: "addedSubstances" },
  { label: "Storage location", key: "locationId" },
  { label: "Units", key: "unit" },
  { label: "Price per unit", key: "pricePerUnit" },
  { label: "Quantity left", key: "totalQuantityLeft" },
];

type SampleDetailsProps = {
  sampleDetails: Sample;
  sampleLocationDetails: RoomData;
};

const SampleDetails: React.FC<SampleDetailsProps> = ({
  sampleDetails,
  sampleLocationDetails,
}) => {
  return (
    <Card sx={{ background: "#0080800f" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Sample Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {sampleDetailsRows.map(({ label, key }) => {
              if (key === "locationId") {
                return (
                  <DetailItem
                    key={label}
                    label={label}
                    value={`${sampleLocationDetails.roomName}, ${sampleLocationDetails.locationName}`}
                  />
                );
              } else if (key === "addedSubstances") {
                return (
                  <Typography key={label}>
                    <Typography
                      component="span"
                      fontWeight="bold"
                      marginRight={1}
                    >
                      {label}:
                    </Typography>
                    {sampleDetails[key].map(({ id, name }, index) => (
                      <React.Fragment key={id}>
                        <NavLink
                          to={RouteProtectedPath.reagentPage.replace(
                            ":id",
                            String(id)
                          )}
                        >
                          {name}
                        </NavLink>
                        {index < sampleDetails[key].length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </Typography>
                );
              } else {
                return (
                  <DetailItem
                    key={label}
                    label={label}
                    value={sampleDetails[key]}
                  />
                );
              }
            })}
          </Grid>

          <Grid item xs={12} sm={6}>
            <SmilesImage smiles={sampleDetails.structure} />
          </Grid>
        </Grid>
        <DetailItem label="Description" value={sampleDetails.description} />
        {/* <EditDeleteButtons
          onDelete={() => setDeleteModalIsOpen(true)}
          onEdit={() => setIsEditing(true)}
        /> */}
      </CardContent>
    </Card>
  );
};

export default SampleDetails;
