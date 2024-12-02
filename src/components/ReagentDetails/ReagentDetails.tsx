import LinkIcon from "@mui/icons-material/Link";
import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DetailItem, SmilesImage, SubstanceLocationsTable } from "@/components";
import { Reagent } from "@/types";

type ReagentKey = keyof Omit<Reagent, "locations">;

const reagentDetailsRows: ReagentKey[] = [
  "name",
  "totalQuantityLeft",
  "CASNumber",
  "producer",
  "catalogID",
  "catalogLink",
  "description",
];

type ReagentDetailsProps = {
  reagentDetails: Reagent;
};

const ReagentDetails: React.FC<ReagentDetailsProps> = ({ reagentDetails }) => {
  const { t } = useTranslation();

  const { catalogLink, structure, locations, category } = reagentDetails;

  return (
    <Card sx={{ background: "#0080800f" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {t("substanceDetails.title.reagent")}
        </Typography>

        <Grid container spacing={2} mb={6}>
          <Grid item xs={12} sm={6}>
            {reagentDetailsRows.map((key) => {
              let value;
              if (key === "catalogLink" && catalogLink) {
                value = (
                  <Link
                    href={catalogLink}
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
                  key={key}
                  label={t(`substanceDetails.fields.${key}`)}
                  value={value}
                />
              );
            })}
          </Grid>

          {structure && (
            <Grid item xs={12} sm={6}>
              <SmilesImage
                smiles={structure}
                svgOptions={{ width: 185, height: 185 }}
                withBorder
              />
            </Grid>
          )}
        </Grid>
        <SubstanceLocationsTable
          locations={locations}
          substanceType={category}
        />
      </CardContent>
    </Card>
  );
};

export default ReagentDetails;
