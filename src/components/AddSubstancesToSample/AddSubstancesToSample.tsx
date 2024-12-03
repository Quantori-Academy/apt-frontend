import { Box } from "@mui/material";
import React from "react";

import { useGetSubstanceTotalQuantityQuery } from "@/store";

const AddSubstancesToSample: React.FC = () => {
  const { data: substances } = useGetSubstanceTotalQuantityQuery();
  console.log(substances);
  return (
    <Box>Add Substances</Box>
    //   <Grid item xs={12}>
    //     <Button
    //       variant="outlined"
    //       onClick={addReagentField}
    //       disabled={selectedReagents.length >= reagentOptions.length}
    //       fullWidth
    //     >
    //       {t("substances.buttons.chooseSubstance")}
    //     </Button>
    //   </Grid>
    // {selectedReagents.map((reagent, index) => (
    //   <Grid
    //     container
    //     spacing={2}
    //     key={index}
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       gap: 1,
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Grid item xs={12} sm={6}>
    //       <Autocomplete
    //         options={reagentOptions}
    //         getOptionLabel={({ label }) => label}
    //         onChange={(event, value) =>
    //           handleReagentChange(event, value, index)
    //         }
    //         renderInput={(params) => (
    //           <TextField
    //             {...params}
    //             label={t(
    //               "addSubstanceForm.requiredFields.substance.label"
    //             )}
    //             placeholder="Select reagent"
    //             fullWidth
    //             margin="normal"
    //           />
    //         )}
    //       />
    //     </Grid>
    //     <Grid
    //       item
    //       xs={12}
    //       sm={4}
    //       sx={{ display: "flex", alignItems: "center", gap: 1 }}
    //     >
    //       <TextField
    //         label={t("addSubstanceForm.requiredFields.consumption.label")}
    //         value={reagent.amount}
    //         onChange={(event) => handleAmountChange(event, index)}
    //         fullWidth
    //         margin="normal"
    //         InputProps={{
    //           inputProps: { min: 1 },
    //         }}
    //       />
    //       <Typography sx={{ marginTop: 1 }}>{reagent.unit}</Typography>
    //     </Grid>
    //   </Grid>
    // ))}
    // <Grid item xs={12}>
    //   <Box display="flex" justifyContent="center">
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       type="submit"
    //       disabled={isLoading}
    //     >
    //       {isLoading
    //         ? t("substances.buttons.adding")
    //         : t("substances.buttons.addSample")}
    //     </Button>
    //   </Box>
    // </Grid>
  );
};

export default AddSubstancesToSample;
