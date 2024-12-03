import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

import { PageLoader, SearchBar } from "@/components";
import { useGetSubstanceTotalQuantityQuery } from "@/store";
import { SampleSubstances } from "@/types";

type AddSubstancesToSampleProps = {
  setAddedSubstances: React.Dispatch<React.SetStateAction<SampleSubstances[]>>;
};

const AddSubstancesToSample: React.FC<AddSubstancesToSampleProps> = ({
  setAddedSubstances,
}) => {
  const { data: substances, isLoading } = useGetSubstanceTotalQuantityQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const textFieldRefs = useRef<{ [key: string]: HTMLInputElement }>({});

  if (!substances) return <PageLoader />;
  const search = substances.filter((substance) => {
    return substance.name.toLowerCase().includes(searchQuery);
  });

  const handleAddSubstance = (itemIndex: number, locIndex: number) => {
    const item = search[itemIndex];
    const location = item.locations[locIndex];

    const quantity = parseInt(
      textFieldRefs.current[`${itemIndex}-${locIndex}`]?.value || "0",
      10
    );

    const newSubstance: SampleSubstances = {
      addedSubstanceId: item.id || null,
      addedSubstanceLocationId: location.locationId || null,
      addedSubstanceQuantity: quantity,
      addedSubstanceUnit: location.unit,
    };
    setAddedSubstances((prev) => [...prev, newSubstance]);
  };

  return (
    <>
      <Typography variant="h6" sx={{ margin: "20px" }}>
        Add Substances
      </Typography>
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
                      inputRef={(ref) => {
                        textFieldRefs.current[`${itemIndex}-${locIndex}`] = ref;
                      }}
                      label={location.unit}
                      size="small"
                      type="number"
                      inputProps={{
                        max: location.totalQuantityLeft,
                      }}
                      sx={{ width: "100px" }}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => handleAddSubstance(itemIndex, locIndex)}
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
