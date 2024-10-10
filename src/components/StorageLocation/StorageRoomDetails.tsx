import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

interface Substance {
  substance_id: number;
  name: string;
  description: string;
  structure_smiles: string;
  location: string;
  place: string;
}

interface StorageRoomDetailsProps {
  roomName: string;
  substances: Substance[];
}

const StorageRoomDetails = ({
  roomName,
  substances,
}: StorageRoomDetailsProps) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">{roomName} - Storage Room Details</Typography>
      <List sx={{ marginTop: 2 }}>
        {substances.map((substance) => (
          <ListItem key={substance.substance_id}>
            <ListItemText
              primary={`Reagent: ${substance.name}`}
              secondary={`Description: ${substance.description}`}
            />
            <Typography variant="body2">{`Structure: ${substance.structure_smiles}`}</Typography>
            <Typography variant="body2">{`Location: ${substance.location}`}</Typography>
            <Typography variant="body2">{`Place: ${substance.place}`}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StorageRoomDetails;
