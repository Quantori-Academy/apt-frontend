import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { SubstanceLocation } from "@/types";

type AddSubstanceLocationToSampleProps = {
  isLast: boolean;
  location: SubstanceLocation;
  onAdd: (quantity: number) => void;
};

const AddSubstanceLocationToSample: React.FC<
  AddSubstanceLocationToSampleProps
> = ({ isLast, location, onAdd }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const { t } = useTranslation();

  return (
    <Grid
      container
      sx={{
        borderBottom: isLast ? "none" : "1px solid #eee",
        paddingY: 1,
      }}
    >
      <Grid item xs={4}>
        <Typography variant="body2">{`${location.location} /${location.room}`}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body2" fontWeight="100">
          {t("addSubstanceForm.texts.totalQuantity")}
        </Typography>
        <Typography variant="body2">
          {`${location.totalQuantityLeft} ${location.unit}`}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          label={location.unit}
          size="small"
          type="number"
          inputProps={{
            min: 0.01,
            max: location.totalQuantityLeft,
            step: "any",
          }}
          sx={{ width: "100px" }}
        />
        <IconButton
          color="primary"
          onClick={() => onAdd(quantity)}
          disabled={quantity <= 0 || quantity > location.totalQuantityLeft}
        >
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default AddSubstanceLocationToSample;
