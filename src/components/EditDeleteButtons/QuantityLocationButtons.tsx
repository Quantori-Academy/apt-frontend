import EditIcon from "@mui/icons-material/Edit";
import MoveUpSharpIcon from "@mui/icons-material/MoveUpSharp";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

type QuantityLocationButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const QuantityLocationButtons: React.FC<QuantityLocationButtonsProps> = ({
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={onEdit}
        >
          {t("substanceDetails.buttons.editQuantity")}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="error"
          startIcon={<MoveUpSharpIcon />}
          onClick={onDelete}
        >
          {t("substanceDetails.buttons.changeLocation")}
        </Button>
      </Grid>
    </Grid>
  );
};
export default QuantityLocationButtons;
