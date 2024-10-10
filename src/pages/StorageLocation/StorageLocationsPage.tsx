import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import AddStorageLocation from "@/components/StorageLocation/AddStorageLocation";
import StorageLocationList from "@/components/StorageLocation/StorageLocationList";
import { StorageLocation } from "@/types";

const generateFakeStorageLocations = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Location ${Math.ceil((index + 1) / 3)}`,
    room: `Room ${index + 1}`,
    description: `Description for Location ${index + 1}`,
  }));
};

const StorageLocationPage: React.FC = () => {
  const [locations, setLocations] = useState<StorageLocation[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fakeData = generateFakeStorageLocations(10);
    setLocations(fakeData);
  }, []);

  const groupLocationsByName = () => {
    return locations.reduce(
      (grouped, location) => {
        if (!grouped[location.name]) {
          grouped[location.name] = [];
        }
        grouped[location.name].push(location);
        return grouped;
      },
      {} as Record<string, StorageLocation[]>
    );
  };

  const handleEdit = (
    id: number,
    data: { room: string; name: string; description: string }
  ) => {
    console.log("Editing Location:", id, data);
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === id ? { ...location, ...data } : location
      )
    );
  };

  const handleDelete = (id: number) => {
    console.log("Deleting Location:", id);
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== id)
    );
  };

  const handleAddLocation = (newLocation: StorageLocation) => {
    console.log("Adding New Location:", newLocation);
    setLocations((prevLocations) => [...prevLocations, newLocation]);
    setShowAddForm(false);
  };

  const handleCancelAddForm = () => {
    setShowAddForm(false);
  };

  const groupedLocations = groupLocationsByName();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Storage Locations
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAddForm(true)}
        >
          Add New Storage Location
        </Button>
      </Box>

      {showAddForm && (
        <AddStorageLocation
          onAddLocation={handleAddLocation}
          onCancel={handleCancelAddForm}
        />
      )}

      <Grid container spacing={3}>
        {Object.entries(groupedLocations).map(
          ([locationName, locationLocations]) => (
            <Grid item xs={12} key={locationName}>
              <Typography variant="h5" gutterBottom>
                {locationName}
              </Typography>
              <StorageLocationList
                locations={locationLocations}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default StorageLocationPage;
