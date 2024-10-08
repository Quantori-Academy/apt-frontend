import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";

import { UsersTable } from "@/components";
import { AddUserModal } from "@/components";
import { useGetUsersQuery } from "@/store/api";

const Users: React.FC = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [openModal, setOpenModal] = useState(false);
  console.log(users);
  if (isLoading) {
    return <Typography variant="h3">Loading...</Typography>;
  }
  if (!users) {
    return <Typography variant="h2">No users found.</Typography>;
  }

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
        <Button onClick={() => setOpenModal(true)} variant="outlined">
          Add User
        </Button>
        {<AddUserModal open={openModal} onClose={() => setOpenModal(false)} />}
      </Box>
      <UsersTable users={users} />
    </Container>
  );
};

export default Users;
