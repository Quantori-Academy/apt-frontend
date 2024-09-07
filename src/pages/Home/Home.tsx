import { Box, Typography } from "@mui/material";

import { Counter, StatusChecker } from "@/components";

const Home: React.FC = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={8}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Home
      </Typography>

      <Counter />

      <StatusChecker />
    </Box>
  );
};

export default Home;
