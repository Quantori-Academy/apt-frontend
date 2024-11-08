import LinkIcon from "@mui/icons-material/Link";
import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DetailItem, EditDeleteButtons, SmilesImage } from "@/components";
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
  { label: "CASNumber", key: "CASNumber" },
  { label: "producer", key: "producer" },
  { label: "locationId", key: "locationId" },
  { label: "catalogID", key: "catalogID" },
  { label: "description", key: "description" },
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
              const value =
                key === "totalQuantityLeft"
                  ? `${reagentDetails[key]} ${reagentDetails.unit || "-"}`
                  : key === "locationId"
                    ? `${reagentLocationDetails.roomName}, ${reagentLocationDetails.locationName}`
                    : reagentDetails[key] || "-";
              return (
                <DetailItem
                  key={label}
                  label={t(`substanceDetails.fields.${label}`)}
                  value={value}
                />
              );
            })}
            <Link
              href={reagentDetails.catalogLink}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LinkIcon sx={{ mr: 1 }} />{" "}
              {t("addSubstanceForm.requiredFields.catalogLink.label")}
            </Link>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom sx={{ textAlign: "center" }}>
              {t("substanceDetails.fields.structure")}
            </Typography>
            <SmilesImage
              smiles={reagentDetails.structure}
              svgOptions={{ width: 185, height: 185 }}
            />
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

export default ReagentDetails;
