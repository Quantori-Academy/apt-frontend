import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

import { AddUserModal } from "@/components";

const UserList: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <Box>
        <Button onClick={() => setOpenModal(true)}>Add User</Button>
        <AddUserModal open={openModal} onClose={() => setOpenModal(false)} />
      </Box>

      <Typography variant="h3" component="h1" gutterBottom>
        User List
      </Typography>
    </Box>
  );
};

export default UserList;
