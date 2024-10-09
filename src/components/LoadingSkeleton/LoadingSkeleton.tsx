import { Box, Card, CardContent } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton: React.FC = () => {
  return (
    <Card sx={{ width: 400, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Skeleton variant="text" height={40} width="60%" />

        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="40%" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="40%" />
          </Box>
          <Skeleton variant="text" width="60%" />
        </Box>

        <Box display="flex" justifyContent="center" mt={4}>
          <Skeleton variant="rectangular" width={200} height={40} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoadingSkeleton;
