import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";

import { AddUserModal, RoleFilter, SearchBar, UsersTable } from "@/components";
import { useGetUsersQuery } from "@/store/api";
import { UserRole } from "@/types";
import { getFilteredUsers } from "@/utils/getFilteredUsers";

export type RoleFilterState = UserRole | "All";

const Users: React.FC = () => {
  const { data: users, isLoading } = useGetUsersQuery();

  const [openModal, setOpenModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilterState>("All");

  if (isLoading) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  if (!users) {
    return <Typography variant="h2">No users found.</Typography>;
  }

  const filteredUsers =
    users && getFilteredUsers(users, searchQuery, roleFilter);

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
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1, height: "60px" }}>
          <RoleFilter roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
        </Box>
        <Box sx={{ flex: 4, height: "60px" }}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>
      </Box>
      <UsersTable users={filteredUsers} />
    </Container>
  );
};

export default Users;
