import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

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
                      <strong>Description:</strong> {substance.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Structure (SMILES):</strong>{" "}
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
                Change Location
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No substances stored in this room.</Typography>
      )}
    </>
  );
};

export default StoredSubstances;
