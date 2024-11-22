import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

type EditDeleteButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
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
          startIcon={<DeleteIcon />}
          onClick={onDelete}
        >
          {t("substanceDetails.buttons.changeLocation")}
        </Button>
      </Grid>
    </Grid>
  );
};
export default EditDeleteButtons;
