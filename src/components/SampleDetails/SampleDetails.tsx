import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { DetailItem, EditDeleteButtons, SmilesImage } from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import { selectUserRole } from "@/store";
import { RoomData, Sample } from "@/types";

type SampleKey = keyof Sample;

type ReagentDetailRow = {
  label: string;
  key: SampleKey;
};

const sampleDetailsRows: ReagentDetailRow[] = [
  { label: "Name", key: "name" },
  { label: "Substances", key: "addedSubstances" },
  { label: "Quantity left", key: "totalQuantityLeft" },
  { label: "Storage location", key: "locationId" },
  { label: "Description", key: "description" },
];

type SampleDetailsProps = {
  sampleDetails: Sample;
  sampleLocationDetails: RoomData;
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const SampleDetails: React.FC<SampleDetailsProps> = ({
  sampleDetails,
  sampleLocationDetails,
  setDeleteModalIsOpen,
  setIsEditing,
}) => {
  const { t } = useTranslation();

  const role = useAppSelector(selectUserRole);

  return (
    <Card sx={{ background: "#0080800f" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {t("substanceDetails.title.sample")}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {sampleDetailsRows.map(({ label, key }) => {
              let value;
              if (key === "totalQuantityLeft") {
                value = `${sampleDetails[key]} ${sampleDetails.unit || "-"}`;
              } else if (key === "locationId") {
                value = `${sampleLocationDetails.roomName}, ${sampleLocationDetails.locationName}`;
              } else if (key === "addedSubstances") {
                value = (
                  <Typography key={label}>
                    <Typography
                      component="span"
                      fontWeight="bold"
                      marginRight={1}
                    >
                      {t(`substanceDetails.fields.${key}`)}:
                    </Typography>
                    {sampleDetails[key].map(({ id, name, category }, index) => (
                      <React.Fragment key={id}>
                        <NavLink
                          to={
                            category === "Reagent"
                              ? RouteProtectedPath.reagentPage.replace(
                                  ":id",
                                  String(id)
                                )
                              : RouteProtectedPath.samplePage.replace(
                                  ":id",
                                  String(id)
                                )
                          }
                        >
                          {name}
                        </NavLink>
                        {index < sampleDetails[key].length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </Typography>
                );
              } else {
                value = sampleDetails[key] || "-";
              }
              {
                return (
                  <DetailItem
                    key={label}
                    label={t(`substanceDetails.fields.${key}`)}
                    value={value}
                  />
                );
              }
            })}
          </Grid>

          {sampleDetails.structure && (
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom sx={{ textAlign: "center" }}>
                {t("substanceDetails.fields.structure")}
              </Typography>
              <SmilesImage
                smiles={sampleDetails.structure}
                svgOptions={{ width: 185, height: 185 }}
              />
            </Grid>
          )}
        </Grid>

        {role === userRoles.Researcher && (
          <EditDeleteButtons
            onDelete={() => setDeleteModalIsOpen(true)}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SampleDetails;
