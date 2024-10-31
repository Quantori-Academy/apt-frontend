import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { SubstancesInLocation } from "@/types";

type StoredSubstancesProps = {
  substances: Array<SubstancesInLocation>;
  onChangeLocation: (substanceId: string) => void;
  openModal: () => void;
};

const StoredSubstances: React.FC<StoredSubstancesProps> = ({
  substances,
  onChangeLocation,
  openModal,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {substances.length > 0 ? (
        <List sx={{ maxHeight: "300px", overflowY: "auto", padding: 0 }}>
          {substances.map((substance) => (
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={substance.substanceId}
              divider
            >
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {substance.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary">
                      <strong>{t("storage.fields.description")}:</strong>{" "}
                      {substance.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>{t("storage.fields.structure")}:</strong>{" "}
                      {substance.structureSmiles}
                    </Typography>
                  </>
                }
              />
              <Button
                onClick={() => {
                  onChangeLocation(substance.substanceId);
                  openModal();
                }}
              >
                {t("storage.buttons.changeLocation")}
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>{t("storage.fields.emptyRoom")}</Typography>
      )}
    </>
  );
};

export default StoredSubstances;
