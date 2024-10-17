import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
