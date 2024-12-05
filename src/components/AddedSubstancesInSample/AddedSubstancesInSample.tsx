import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid, IconButton, Typography } from "@mui/material";

import { AddedSubstanceDetails, SampleSubstances } from "@/types";

type AddedSubstancesInSampleProps = {
  substancesDetails: AddedSubstanceDetails[];
  onChangeSubstancesDetails: React.Dispatch<
    React.SetStateAction<AddedSubstanceDetails[]>
  >;
  onChangesAddedSubstances: React.Dispatch<
    React.SetStateAction<SampleSubstances[]>
  >;
};

const AddedSubstancesInSample: React.FC<AddedSubstancesInSampleProps> = ({
  substancesDetails,
  onChangeSubstancesDetails,
  onChangesAddedSubstances,
}) => {
  const handleDelete = (id: number) => {
    onChangeSubstancesDetails((prev) =>
      prev.filter((item) => item.locationId !== id)
    );

    onChangesAddedSubstances((prev) =>
      prev.filter((item) => item.addedSubstanceLocationId !== id)
    );
  };

  return (
    <Box
      sx={{
        padding: "8px",
        margin: "8px",
      }}
    >
      {substancesDetails.map((reagent) => (
        <Grid
          container
          key={reagent.locationId}
          sx={{
            borderBottom: "1px solid #ddd",
            padding: "4px 0",
            alignItems: "center",
          }}
        >
          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              {reagent.name}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              {reagent.location}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", textAlign: "center" }}
            >
              {reagent.quantity}
            </Typography>
          </Grid>

          <Grid item xs={2} sx={{ textAlign: "right" }}>
            <IconButton
              onClick={() => handleDelete(reagent.locationId)}
              aria-label="delete"
              sx={{ color: "red", padding: "4px" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default AddedSubstancesInSample;
