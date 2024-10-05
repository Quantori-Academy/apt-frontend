import { Box, Button, Container, Typography } from "@mui/material";

import { UsersTable } from "@/components";

const Users: React.FC = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h2">Users list</Typography>
        <Button variant="outlined">Add User</Button>
      </Box>
      <UsersTable />
    </Container>
  );
};

export default Users;
