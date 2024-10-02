import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserList: React.FC = () => {
  return (
    <Box>
      <Link to="new">
        <Button>Add User</Button>
      </Link>
      <Typography variant="h3" component="h1" gutterBottom>
        User List
      </Typography>
    </Box>
  );
};

export default UserList;
