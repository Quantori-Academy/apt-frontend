import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

import { BasicModal } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useDeleteSubstancesMutation } from "@/store";
import { SubstancesDetails } from "@/types";
import { formatExpDate } from "@/utils";

type DisposeExpiredSubstancesProps = {
  substances: Array<SubstancesDetails>;
};

const DisposeExpiredSubstances: React.FC<DisposeExpiredSubstancesProps> = ({
  substances,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { showSuccess, showError } = useAlertSnackbar();

  const [deleteSubstances, { isLoading: isDeleting }] =
    useDeleteSubstancesMutation();

  const handelDisposeExpiredSubstances = async () => {
    const ids = substances.map((substance) => Number(substance.id));

    const { error } = await deleteSubstances(ids);
    if (error) {
      showError("Failed to Dispose substances");
    } else {
      showSuccess("Expired Substances successfully Disposed");
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        sx={{ borderColor: "#ef5350", color: "#ef5350" }}
        onClick={() => setIsOpen(true)}
      >
        Dispose Expired Substances
      </Button>
      <BasicModal
        titleColor="#ef5350"
        title="Deletion Confirmation"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <Typography marginBottom="20px">
          Are you sure you want to Dispose this substances?
        </Typography>
        <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
          {substances.map((substance) => (
            <Grid
              container
              key={substance.id}
              sx={{
                borderBottom: "1px solid #ddd",
                padding: "4px",
                display: "flex",
                flexDirection: "column", // Stack the data vertically
                alignItems: "flex-start",
              }}
            >
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  {substance.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "10px", color: "#666" }}
                >
                  Location: {substance.storageLocation}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "10px", color: "#666" }}
                >
                  Expiration: {formatExpDate(substance.expirationDate)}
                </Typography>
              </Grid>
              <Grid item sx={{ marginTop: "4px" }}>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "12px", textAlign: "center" }}
                >
                  {substance.quantityLeft} left
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
        <Box display="flex" justifyContent="flex-end" gap={1} marginTop={3}>
          <Button
            onClick={handelDisposeExpiredSubstances}
            disabled={isDeleting}
            sx={{ borderColor: "#ef5350", color: "#ef5350" }}
          >
            Dispose
          </Button>
          <Button onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
        </Box>
      </BasicModal>
    </>
  );
};

export default DisposeExpiredSubstances;
