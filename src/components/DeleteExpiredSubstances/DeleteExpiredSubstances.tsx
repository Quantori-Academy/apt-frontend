import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

import { BasicModal } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useDeleteSubstancesMutation } from "@/store/substancesApi.ts";
import { SubstancesDetails } from "@/types";

type DeleteExpiredSubstancesProps = {
  substances: Array<SubstancesDetails>;
};

const DeleteExpiredSubstances: React.FC<DeleteExpiredSubstancesProps> = ({
  substances,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { showSuccess, showError } = useAlertSnackbar();

  const [deleteSubstances, { isLoading: isDeleting }] =
    useDeleteSubstancesMutation();

  const handelDeleteExpiredSubstances = async () => {
    const ids = substances.map((substance) => substance.id);
    const { error } = await deleteSubstances(ids);
    if (error) {
      showError("Failed to delete substances");
    } else {
      showSuccess("Expired Substances successfully deleted");
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        sx={{ borderColor: "#ef5350", color: "#ef5350" }}
        onClick={() => setIsOpen(true)}
      >
        Delete Expired Substances
      </Button>
      <BasicModal
        titleColor="#ef5350"
        title="Deletion Confirmation"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <Typography marginBottom="20px">
          Are you sure you want to delete this substances? This action cannot be
          undone
        </Typography>
        {substances.map((substance) => (
          <Grid
            container
            key={substance.id}
            sx={{
              borderBottom: "1px solid #ddd",
              padding: "4px",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {substance.name}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {substance.storageLocation}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", textAlign: "center" }}
              >
                {substance.quantityLeft}
              </Typography>
            </Grid>

            <Grid item xs={2} sx={{ textAlign: "center" }}></Grid>
          </Grid>
        ))}

        <Box display="flex" justifyContent="flex-end" gap={3} marginTop={3}>
          <Button
            onClick={handelDeleteExpiredSubstances}
            disabled={isDeleting}
            sx={{ borderColor: "#ef5350", color: "#ef5350" }}
          >
            Delete
          </Button>
          <Button onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
        </Box>
      </BasicModal>
    </>
  );
};

export default DeleteExpiredSubstances;
