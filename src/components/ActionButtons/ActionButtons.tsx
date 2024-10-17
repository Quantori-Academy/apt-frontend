import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid } from "@mui/material";

type ActionButtonsProps = {
  onEdit?: () => void;
  onDelete: () => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDelete }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<EditIcon />}>
          Edit
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};
export default ActionButtons;
