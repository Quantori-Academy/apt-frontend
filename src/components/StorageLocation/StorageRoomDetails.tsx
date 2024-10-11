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
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        {roomName} - Storage Room Details
      </Typography>
      <List sx={{ marginTop: 2 }}>
        {substances.map((substance) => (
          <ListItem
            key={substance.substance_id}
            sx={{ alignItems: "flex-start", paddingY: 2 }}
          >
            <ListItemText
              primary={
                <Typography variant="h6">{`Reagent: ${substance.name}`}</Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {`Description: ${substance.description}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Location: ${substance.location}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Place: ${substance.place}`}
                  </Typography>
                </>
              }
            />
            <Box sx={{ marginLeft: "auto", textAlign: "right" }}>
              <Typography variant="caption" color="textSecondary">
                {`Structure: ${substance.structure_smiles}`}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StorageRoomDetails;
