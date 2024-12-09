import { Box, Grid, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AddSubstanceLocationToSample,
  PageLoader,
  SearchBar,
} from "@/components";
import { useGetSubstanceTotalQuantityQuery } from "@/store";
import { AddedSubstanceDetails, SampleSubstances } from "@/types";

type AddSubstancesToSampleProps = {
  setAddedSubstances: React.Dispatch<React.SetStateAction<SampleSubstances[]>>;
  setAddedSubstancesDetails: React.Dispatch<
    React.SetStateAction<AddedSubstanceDetails[]>
  >;
};

const AddSubstancesToSample: React.FC<AddSubstancesToSampleProps> = ({
  setAddedSubstances,
  setAddedSubstancesDetails,
}) => {
  const { data: substances, isLoading } = useGetSubstanceTotalQuantityQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation();
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

    const addedSubstancesDetails: AddedSubstanceDetails = {
      locationId: location.locationId,
      substanceId: item.id,
      name: item.name,
      location: `${location.location} / ${location.room}`,
      quantity: `${quantity} ${location.unit}`,
    };

    setAddedSubstancesDetails((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) =>
          item.locationId !== addedSubstancesDetails.locationId ||
          item.substanceId !== addedSubstancesDetails.substanceId
      );
      return [...updatedItems, addedSubstancesDetails];
    });

    setAddedSubstances((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) =>
          item.addedSubstanceLocationId !==
            newSubstance.addedSubstanceLocationId ||
          item.addedSubstanceId !== newSubstance.addedSubstanceId
      );
      return [...updatedItems, newSubstance];
    });
  };

  return (
    <>
      <Typography variant="h6">
        {t("addSubstanceForm.title.addSubstance")}
      </Typography>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoading={isLoading}
        placeholder={t("addSubstanceForm.placeholders.search")}
        padding="15px 0 0 0"
      />
      {!search.length && searchQuery ? (
        <Typography margin="20px">
          {t("addSubstanceForm.emptyAreas.noSearchReagent")}
        </Typography>
      ) : (
        <Box width="100%">
          {search.map((item, itemIndex) => (
            <Box
              key={itemIndex}
              sx={{
                border: "1px solid #33ab9f",
                borderRadius: "8px",
                padding: "8px",
                marginY: "8px",
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
                <Grid item xs={12}>
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
                  onAdd={(quantity: number) =>
                    handleAddSubstance(itemIndex, locIndex, quantity)
                  }
                />
              ))}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default AddSubstancesToSample;
