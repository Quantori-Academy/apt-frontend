import { Container, Typography } from "@mui/material";

import { ReagentRequestTable } from "@/components";

const ReagentRequests: React.FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        height: "100%",
      }}
    >
      <Typography variant="h3">Reagent Requests</Typography>
      <ReagentRequestTable />
    </Container>
  );
};

export default ReagentRequests;
