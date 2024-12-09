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
  DisposeButton,
  OutOfStock,
  SmilesImage,
  SubstanceLocationsTable,
} from "@/components";
import { userRoles } from "@/constants";
import { useAlertSnackbar, useAppSelector } from "@/hooks";
import { selectUserRole, useDeleteSubstancesMutation } from "@/store";
import { Sample } from "@/types";
import { formatDate, handleError } from "@/utils";

import CustomTabPanel from "./CustomTabelPanel";

type SampleKey = keyof Omit<Sample, "locations" | "addedSubstances">;

const sampleDetailsRows: SampleKey[] = [
  "name",
  "totalQuantityLeft",
  "description",
  "expirationDate",
];

type SampleDetailsProps = {
  sampleDetails: Sample;
};

const SampleDetails: React.FC<SampleDetailsProps> = ({ sampleDetails }) => {
  const { t } = useTranslation();

  const role = useAppSelector(selectUserRole);

  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [deleteSubstances] = useDeleteSubstancesMutation();

  const { showSuccess, showError } = useAlertSnackbar();

  const onClickDelete = async () => {
    try {
      const { error } = await deleteSubstances([Number(substanceId)]);

      if (error && "message" in error) {
        showError(t("substanceDetails.snackBarMessages.reagent.errorDelete"));
      } else {
        showSuccess(
          t("substanceDetails.snackBarMessages.reagent.successDelete")
        );
      }
    } catch (error) {
      handleError({ error, t, showError });
    }
  };

  const {
    substanceId,
    structure,
    locations,
    addedSubstances,
    category,
    expirationDate,
  } = sampleDetails;

  const hasLocations = !!locations?.length;

  const isExpired = expirationDate
    ? new Date() > new Date(expirationDate)
    : false;

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
                  value={
                    key === "expirationDate"
                      ? formatDate(sampleDetails[key])
                      : sampleDetails[key] || "-"
                  }
                  color={isExpired && key === "expirationDate" ? "red" : ""}
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
        {role === userRoles.Researcher && isExpired && locations && (
          <DisposeButton
            substanceType={category}
            onClickDispose={onClickDelete}
          />
        )}
        {!hasLocations && <OutOfStock />}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab
              label={t("addSubstanceForm.title.addedSubstances")}
              id="tab-1"
            />
            {hasLocations && (
              <Tab
                label={t("storage.fields.locations").slice(0, -1)}
                id="tab-2"
              />
            )}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AddedSubstancesTable addedSubstances={addedSubstances} />
        </CustomTabPanel>
        {hasLocations && (
          <CustomTabPanel value={value} index={1}>
            <SubstanceLocationsTable
              locations={locations}
              substanceType={category}
            />
          </CustomTabPanel>
        )}
      </CardContent>
    </Card>
  );
};

export default SampleDetails;
