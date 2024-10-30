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
  { label: "Reagent ID", key: "substanceId" },
  { label: "Name", key: "name" },
  { label: "Category", key: "category" },
  { label: "CAS Number", key: "CASNumber" },
  { label: "Producer", key: "producer" },
  { label: "Storage location", key: "locationId" },
  { label: "Units", key: "unit" },
  { label: "Price per unit", key: "pricePerUnit" },
  { label: "Quantity left", key: "totalQuantityLeft" },
  { label: "Catalog ID", key: "catalogID" },
  { label: "Description", key: "description" },
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
            {reagentDetailsRows.map(({ label, key }) =>
              key !== "locationId" ? (
                <DetailItem
                  key={label}
                  label={t(`substanceDetails.fields.${key}`)}
                  value={
                    key === "category"
                      ? t(`substances.filters.options.${reagentDetails[key]}`)
                      : reagentDetails[key]
                  }
                />
              ) : (
                <DetailItem
                  key={label}
                  label={t(`substanceDetails.fields.${key}`)}
                  value={`${reagentLocationDetails.roomName}, ${reagentLocationDetails.locationName}`}
                />
              )
            )}
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
            <SmilesImage smiles={reagentDetails.structure} />
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
