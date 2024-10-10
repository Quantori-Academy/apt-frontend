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
import { StorageRoomsBrief } from "@/types";

interface Props {
  locations: StorageRoomsBrief[];
}

const StorageLocationList: React.FC<Props> = ({ locations }) => {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({
    storageRoom: "",
  });

  const handleEdit = (id: number, storageRoom: string) => {
    setEditingId(id);
    setEditValues({ storageRoom });
  };

  const handleSave = (id: number) => {
    dispatch(editStorageLocation({ id, roomName: editValues.storageRoom }));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteStorageLocation(id));
  };

  return (
    <Box>
      <List>
        {locations.map((location) => (
          <ListItem
            key={location.id}
            alignItems="flex-start"
            sx={{ padding: 1 }}
          >
            {editingId === location.id ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              >
                <TextField
                  label="Storage Room"
                  value={editValues.storageRoom}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      storageRoom: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  minRows={2}
                  sx={{
                    fontSize: "1.1rem",
                  }}
                />
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(location.id)}
                    sx={{ fontSize: "0.9rem", padding: "10px 20px" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditingId(null)}
                    sx={{ fontSize: "0.9rem", padding: "10px 20px" }}
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
                <ListItemText primary={location.storage_room} />
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      handleEdit(location.id, location.storage_room)
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
