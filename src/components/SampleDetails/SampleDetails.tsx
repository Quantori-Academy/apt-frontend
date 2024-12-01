import {
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AddedSubstancesTable,
  DetailItem,
  SmilesImage,
  SubstanceLocationsTable,
} from "@/components";
import { Sample } from "@/types";

import CustomTabPanel from "./CustomTabelPanel";

type SampleKey = keyof Omit<Sample, "locations" | "addedSubstances">;

const sampleDetailsRows: SampleKey[] = [
  "name",
  "totalQuantityLeft",
  "description",
];

type SampleDetailsProps = {
  sampleDetails: Sample;
};

const SampleDetails: React.FC<SampleDetailsProps> = ({ sampleDetails }) => {
  const { t } = useTranslation();

  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ background: "#0080800f" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {t("substanceDetails.title.sample")}
        </Typography>

        <Grid container spacing={2} mb={6}>
          <Grid item xs={12} sm={6}>
            {sampleDetailsRows.map((key) => {
              return (
                <DetailItem
                  key={key}
                  label={t(`substanceDetails.fields.${key}`)}
                  value={sampleDetails[key] || "-"}
                />
              );
            })}
          </Grid>

          {sampleDetails.structure && (
            <Grid item xs={12} sm={6}>
              <SmilesImage
                smiles={sampleDetails.structure}
                svgOptions={{ width: 185, height: 185 }}
                withBorder
              />
            </Grid>
          )}
        </Grid>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Added substances" id="tab-1" />
            <Tab label="Locations" id="tab-2" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AddedSubstancesTable
            addedSubstances={sampleDetails.addedSubstances}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SubstanceLocationsTable
            locations={sampleDetails.locations}
            substanceType={sampleDetails.category}
          />
        </CustomTabPanel>
      </CardContent>
    </Card>
  );
};

export default SampleDetails;
