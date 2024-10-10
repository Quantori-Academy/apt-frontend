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
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ storageRoom: "" });

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

  const handleLocationClick = (storageRoomId: number) => {
    navigate(`/storage/:${storageRoomId}`);
  };

  return (
    <Box>
      <List>
        {locations.map((storageRoom) => (
          <ListItem
            key={storageRoom.id}
            alignItems="flex-start"
            sx={{ padding: 1, flexDirection: "column" }}
          >
            {editingId === storageRoom.id ? (
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
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
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(storageRoom.id)}
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
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleLocationClick(storageRoom.id)}
                  >
                    {storageRoom.storage_room}
                  </Typography>
                  <Typography variant="body2">
                    Total Substances: {storageRoom.total_substances}
                  </Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(storageRoom.id, storageRoom.storage_room)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(storageRoom.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <List sx={{ marginLeft: 2 }}>
                  {storageRoom.locations.map((location) => (
                    <ListItem key={location.id}>
                      <ListItemText
                        primary={`Location: ${location.location}`}
                        secondary={`Place: ${location.place}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StorageLocationList;
