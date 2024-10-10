import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  deleteStorageLocation,
  editStorageLocation,
} from "@/store/slices/storageSlice";
import { StorageLocation } from "@/types";

interface Props {
  locations: StorageLocation[];
  onEdit: (
    id: number,
    data: { room: string; name: string; description: string }
  ) => void;
  onDelete: (id: number) => void;
}

const StorageLocationList: React.FC<Props> = ({ locations }) => {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({
    room: "",
    name: "",
    description: "",
  });

  const handleEdit = (
    id: number,
    room: string,
    name: string,
    description: string
  ) => {
    setEditingId(id);
    console.log(id);
    setEditValues({ room, name, description });
  };

  const handleSave = (id: number) => {
    dispatch(editStorageLocation({ id, data: editValues }));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteStorageLocation(id));
  };

  return (
    <Box>
      <List>
        {locations.map((location) => (
          <ListItem key={location.id} alignItems="flex-start">
            {editingId === location.id ? (
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <TextField
                  label="Room"
                  value={editValues.room}
                  onChange={(e) =>
                    setEditValues({ ...editValues, room: e.target.value })
                  }
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Name"
                  value={editValues.name}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Description"
                  value={editValues.description}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      description: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(location.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <ListItemText
                  primary={`${location.room} - ${location.name}`}
                  secondary={location.description}
                />
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      handleEdit(
                        location.id,
                        location.room,
                        location.name,
                        location.description
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(location.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StorageLocationList;
