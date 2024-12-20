import LinkIcon from "@mui/icons-material/Link";
import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  DetailItem,
  DisposeButton,
  OutOfStock,
  SmilesImage,
  SubstanceLocationsTable,
} from "@/components";
import { userRoles } from "@/constants";
import { useAlertSnackbar, useAppSelector } from "@/hooks";
import { selectUserRole, useDeleteSubstancesMutation } from "@/store";
import { Reagent } from "@/types";
import { formatDate } from "@/utils";
import { handleError } from "@/utils/handleError";

type ReagentKey = keyof Omit<Reagent, "locations">;

const reagentDetailsRows: ReagentKey[] = [
  "name",
  "totalQuantityLeft",
  "CASNumber",
  "producer",
  "catalogID",
  "catalogLink",
  "description",
  "expirationDate",
];

type ReagentDetailsProps = {
  reagentDetails: Reagent;
};

const ReagentDetails: React.FC<ReagentDetailsProps> = ({ reagentDetails }) => {
  const { t } = useTranslation();

  const role = useAppSelector(selectUserRole);

  const [deleteSubstances] = useDeleteSubstancesMutation();

  const { showSuccess, showError } = useAlertSnackbar();

  const onClickDelete = async () => {
    try {
      await deleteSubstances([Number(substanceId)]).unwrap();
      showSuccess(t("substanceDetails.snackBarMessages.reagent.successDelete"));
    } catch (error) {
      handleError({ error, t, showError });
    }
  };

  const {
    catalogLink,
    structure,
    locations,
    category,
    expirationDate,
    substanceId,
  } = reagentDetails;

  const isExpired = expirationDate
    ? new Date() > new Date(expirationDate)
    : false;

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
              } else if (key === "expirationDate")
                value = formatDate(reagentDetails[key]);
              else {
                value = reagentDetails[key] || "-";
              }
              return (
                <DetailItem
                  key={key}
                  label={t(`substanceDetails.fields.${key}`)}
                  value={value}
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
        {locations ? (
          <SubstanceLocationsTable
            locations={locations}
            substanceType={category}
          />
        ) : (
          <OutOfStock />
        )}
      </CardContent>
    </Card>
  );
};

export default ReagentDetails;
