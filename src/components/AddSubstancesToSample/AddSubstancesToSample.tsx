import { Box, Grid, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";

import { PageLoader, SearchBar } from "@/components";
import { AddSubstanceLocationToSample } from "@/components/AddSubstanceLocationToSample";
import { useGetSubstanceTotalQuantityQuery } from "@/store";
import { SampleSubstances } from "@/types";

type AddSubstancesToSampleProps = {
  addedSubstances: SampleSubstances[];
  setAddedSubstances: React.Dispatch<React.SetStateAction<SampleSubstances[]>>;
};

const AddSubstancesToSample: React.FC<AddSubstancesToSampleProps> = ({
  addedSubstances,
  setAddedSubstances,
}) => {
  const { data: substances, isLoading } = useGetSubstanceTotalQuantityQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const search = useMemo(() => {
    if (!substances || searchQuery.length < 3) return [];

    return substances.filter((substance) =>
      substance.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, substances]);

  if (!substances) return <PageLoader />;

  const handleAddSubstance = (
    itemIndex: number,
    locIndex: number,
    quantity: number
  ) => {
    const item = search[itemIndex];
    const location = item.locations[locIndex];

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
      <Typography variant="h6">Add Substances</Typography>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoading={isLoading}
        placeholder="Type at least 3 letters to search..."
        padding="15px 0 0 15px"
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
                <AddSubstanceLocationToSample
                  key={location.locationId}
                  isLast={locIndex === item.locations.length - 1}
                  location={location}
                  onAdd={(quantity) =>
                    handleAddSubstance(itemIndex, locIndex, quantity)
                  }
                />
              ))}
            </Box>
          ))}
        </Box>
      )}
      <pre>{JSON.stringify(addedSubstances, null, 2)}</pre>
    </>
  );
};

export default AddSubstancesToSample;
