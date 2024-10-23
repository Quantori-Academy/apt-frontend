import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const PageLoader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default PageLoader;
