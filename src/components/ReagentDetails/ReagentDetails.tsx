import LinkIcon from "@mui/icons-material/Link";
import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DetailItem, SmilesImage, SubstanceLocationsTable } from "@/components";
import { Reagent } from "@/types";

type ReagentKey = keyof Omit<Reagent, "locations">;

type ReagentDetailRow = {
  label: string;
  key: ReagentKey;
};

const reagentDetailsRows: ReagentDetailRow[] = [
  { label: "name", key: "name" },
  { label: "totalQuantityLeft", key: "totalQuantityLeft" },
  { label: "CASNumber", key: "CASNumber" },
  { label: "producer", key: "producer" },
  { label: "catalogID", key: "catalogID" },
  { label: "catalogLink", key: "catalogLink" },
  { label: "description", key: "description" },
];

type ReagentDetailsProps = {
  reagentDetails: Reagent;
};

const ReagentDetails: React.FC<ReagentDetailsProps> = ({ reagentDetails }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ background: "#0080800f" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {t("substanceDetails.title.reagent")}
        </Typography>

        <Grid container spacing={2} mb={6}>
          <Grid item xs={12} sm={6}>
            {reagentDetailsRows.map(({ label, key }) => {
              let value;
              if (key === "catalogLink" && reagentDetails.catalogLink) {
                value = (
                  <Link
                    href={reagentDetails.catalogLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <LinkIcon sx={{ mr: 1 }} />
                    {t("addSubstanceForm.requiredFields.catalogLink.label")}
                  </Link>
                );
              } else {
                value = reagentDetails[key] || "-";
              }
              return (
                <DetailItem
                  key={label}
                  label={t(`substanceDetails.fields.${label}`)}
                  value={value}
                />
              );
            })}
          </Grid>

          {reagentDetails.structure && (
            <Grid item xs={12} sm={6}>
              <SmilesImage
                smiles={reagentDetails.structure}
                svgOptions={{ width: 185, height: 185 }}
                withBorder
              />
            </Grid>
          )}
        </Grid>
        <SubstanceLocationsTable
          locations={reagentDetails.locations}
          substanceType={reagentDetails.category}
        />
      </CardContent>
    </Card>
  );
};

export default ReagentDetails;
