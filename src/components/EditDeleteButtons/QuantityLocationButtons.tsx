import EditIcon from "@mui/icons-material/Edit";
import MoveUpSharpIcon from "@mui/icons-material/MoveUpSharp";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

type QuantityLocationButtonsProps = {
  onChangeQuantity: () => void;
  onChangeLocation: () => void;
};

const QuantityLocationButtons: React.FC<QuantityLocationButtonsProps> = ({
  onChangeQuantity,
  onChangeLocation,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={onChangeQuantity}
        >
          {t("substanceDetails.buttons.editQuantity")}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="error"
          startIcon={<MoveUpSharpIcon />}
          onClick={onChangeLocation}
        >
          {t("substanceDetails.buttons.changeLocation")}
        </Button>
      </Grid>
    </Grid>
  );
};
export default QuantityLocationButtons;
