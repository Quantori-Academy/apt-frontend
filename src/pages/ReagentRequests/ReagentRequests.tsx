import { Container, Typography } from "@mui/material";

import { ReagentRequestTable } from "@/components";

const ReagentRequests: React.FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <Typography variant="h3">Reagent Requests</Typography>
      <ReagentRequestTable />
    </Container>
  );
};

export default ReagentRequests;
