import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { DetailItem, EditDeleteButtons, SmilesImage } from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { selectUserRole } from "@/store";
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
              if (key === "locationId") {
                return (
                  <DetailItem
                    key={label}
                    label={t(`substanceDetails.fields.${key}`)}
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
                return (
                  <DetailItem
                    key={label}
                    label={t(`substanceDetails.fields.${key}`)}
                    value={
                      key === "category"
                        ? t(`substances.filters.options.${sampleDetails[key]}`)
                        : sampleDetails[key]
                    }
                  />
                );
              }
            })}
          </Grid>

          <Grid item xs={12} sm={6}>
            <SmilesImage smiles={sampleDetails.structure} />
          </Grid>
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
