import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  openModal: (title: string) => void;
}

const StorageLocationItem: React.FC<Props> = ({ openModal }) => {
  return (
    <>
      <Card sx={{ width: "100%", borderRadius: 2.5 }}>
        <Link href="/storage_locations/1" sx={{ textDecoration: "none" }}>
          <CardActionArea
            sx={{
              position: "relative",
              cursor: "pointer",
              "&:hover": { bgcolor: "rgb(255, 246, 249)" },
              "&:hover #arrowBox": {
                opacity: 1,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Name: Storage location name
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Room: Storage location room
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Description: Storage location description
              </Typography>
            </CardContent>
            <Box
              id="arrowBox"
              sx={{
                position: "absolute",
                top: "50%",
                right: "16px",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                color: "palevioletred",
                bgcolor: "rgb(255, 248, 235)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "opacity 0.3s",
                opacity: 0,
              }}
            >
              <ArrowForwardIcon />
            </Box>
          </CardActionArea>
        </Link>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              size="small"
              color="primary"
              sx={{ borderColor: "palevioletred", color: "palevioletred" }}
            >
              Move
            </Button>
            <Box sx={{ display: "flex", gap: 2, borderColor: "primary.main" }}>
              <Button
                sx={{ color: "primary.main" }}
                onClick={() => openModal("Edit Storage")}
              >
                Edit
              </Button>
              <Button
                sx={{ color: "error.main", borderColor: "red" }}
                onClick={() => openModal("Delete Storage")}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
      <Card sx={{ width: "100%", borderRadius: 2.5 }}>
        <Link href="/storage_locations/1" sx={{ textDecoration: "none" }}>
          <CardActionArea
            sx={{
              position: "relative",
              cursor: "pointer",
              "&:hover": { bgcolor: "rgb(255, 246, 249)" },
              "&:hover #arrowBox": {
                opacity: 1,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Name: Storage location name
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Room: Storage location room
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Description: Storage location description
              </Typography>
            </CardContent>
            <Box
              id="arrowBox"
              sx={{
                position: "absolute",
                top: "50%",
                right: "16px",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                color: "palevioletred",
                bgcolor: "rgb(255, 248, 235)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "opacity 0.3s",
                opacity: 0,
              }}
            >
              <ArrowForwardIcon />
            </Box>
          </CardActionArea>
        </Link>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              size="small"
              color="primary"
              sx={{ borderColor: "palevioletred", color: "palevioletred" }}
            >
              Move
            </Button>
            <Box sx={{ display: "flex", gap: 2, borderColor: "primary.main" }}>
              <Button
                sx={{ color: "primary.main" }}
                onClick={() => openModal("Edit Storage")}
              >
                Edit
              </Button>
              <Button
                sx={{ color: "error.main", borderColor: "red" }}
                onClick={() => openModal("Delete Storage")}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </>
  );
};

export default StorageLocationItem;
