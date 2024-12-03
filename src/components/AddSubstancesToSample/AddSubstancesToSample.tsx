import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { PageLoader, SearchBar } from "@/components";
import { useGetSubstanceTotalQuantityQuery } from "@/store";

const AddSubstancesToSample: React.FC = () => {
  // const { t } = useTranslation();
  // const [selectedSubstances, setSelectedSubstances] = useState([]);

  const { data: substances, isLoading } = useGetSubstanceTotalQuantityQuery();
  const [searchQuery, setSearchQuery] = useState("");

  if (!substances) return <PageLoader />;
  const search = substances.filter((substance) => {
    return substance.name.toLowerCase().includes(searchQuery);
  });
  //[
  //     {
  //       "added_substance_id": 0,
  //       "added_substance_location_id": 0,
  //       "added_substance_quantity": 0,
  //       "added_substance_unit": "string"
  //     }
  //   ]
  //
  // const handleAddSubstance = (item, location, quantity) => {
  //   const newSubstance = {
  //     name: item.name,
  //     location: location.name,
  //     quantity,
  //   };
  //   setSelectedSubstances((prev) => [...prev, newSubstance]);
  // };

  return (
    <>
      <Box>Add Substances</Box>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoading={isLoading}
      />
      {searchQuery && (
        <Box>
          {search.map((item, itemIndex) => (
            <Box
              key={itemIndex}
              sx={{
                border: "1px solid #33ab9f",
                borderRadius: "8px",
                padding: "8px",
                margin: "8px",
              }}
            >
              {/* Main Item Row */}
              <Grid
                alignItems="center"
                container
                sx={{
                  borderBottom: "1px solid #eee",
                  paddingY: 1,
                }}
              >
                <Grid item xs={4}>
                  <Typography variant="body2" fontWeight="bold">
                    {item.name}
                  </Typography>
                </Grid>
              </Grid>

              {/* Location Rows */}
              {item.locations.map((location, locIndex) => (
                <Grid
                  container
                  key={locIndex}
                  sx={{
                    borderBottom:
                      locIndex === item.locations.length - 1
                        ? "none"
                        : "1px solid #eee",
                    paddingY: 1,
                  }}
                >
                  <Grid item xs={4}>
                    <Typography variant="body2">{`${location.location} /${location.room}`}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      TotalQuantity:{" "}
                      {`${location.totalQuantityLeft} ${location.unit}`}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <TextField
                      label={location.unit}
                      size="small"
                      type="number"
                      sx={{ width: "100px" }}

                      // value={location.quantity}
                      // onChange={(e) =>
                      //   handleQuantityChange(itemIndex, locIndex, e.target.value)
                      // }
                    />
                    <IconButton
                      color="primary"
                      // onClick={() => handleAddSubstance(item, location, "20")}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default AddSubstancesToSample;
