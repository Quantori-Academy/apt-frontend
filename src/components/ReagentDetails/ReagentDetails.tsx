import LinkIcon from "@mui/icons-material/Link";
import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DetailItem, QuantityLocationButtons, SmilesImage } from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";
import { Reagent, RoomData } from "@/types";

type ReagentKey = keyof Reagent;

type ReagentDetailRow = {
  label: string;
  key: ReagentKey;
};

const reagentDetailsRows: ReagentDetailRow[] = [
  { label: "name", key: "name" },
  { label: "totalQuantityLeft", key: "totalQuantityLeft" },
  { label: "price", key: "pricePerUnit" },
  { label: "locationId", key: "locationId" },
  { label: "CASNumber", key: "CASNumber" },
  { label: "producer", key: "producer" },
  { label: "catalogID", key: "catalogID" },
  { label: "catalogLink", key: "catalogLink" },
  { label: "description", key: "description" },
];

type ReagentDetailsProps = {
  reagentDetails: Reagent;
  reagentLocationDetails: RoomData;
  setIsChangingQuantity: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChangingLocation: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReagentDetails: React.FC<ReagentDetailsProps> = ({
  reagentDetails,
  reagentLocationDetails,
  setIsChangingQuantity,
  setIsChangingLocation,
}) => {
  const { t } = useTranslation();

  const role = useAppSelector(selectUserRole);

  return (
    <Card sx={{ background: "#0080800f" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {t("substanceDetails.title.reagent")}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {reagentDetailsRows.map(({ label, key }) => {
              let value;
              if (key === "totalQuantityLeft") {
                value = `${reagentDetails[key]} ${reagentDetails.unit || "-"}`;
              } else if (key === "locationId") {
                value = `${reagentLocationDetails.roomName}, ${reagentLocationDetails.locationName}`;
              } else if (key === "catalogLink" && reagentDetails.catalogLink) {
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
              <Typography gutterBottom sx={{ textAlign: "center" }}>
                {t("substanceDetails.fields.structure")}
              </Typography>
              <SmilesImage
                smiles={reagentDetails.structure}
                svgOptions={{ width: 185, height: 185 }}
              />
            </Grid>
          )}
        </Grid>
        {role === userRoles.Researcher && (
          <QuantityLocationButtons
            onChangeQuantity={() => setIsChangingQuantity(true)}
            onChangeLocation={() => setIsChangingLocation(true)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ReagentDetails;
