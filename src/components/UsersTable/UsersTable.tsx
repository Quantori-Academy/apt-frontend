import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { UserTableColumn, UserTableProps } from "@/types";

const columns: UserTableColumn[] = [
  { label: "Username", key: "username" },
  { label: "First Name", key: "first_name" },
  { label: "Last Name", key: "last_name" },
  { label: "Email", key: "email" },
  { label: "Role", key: "role" },
  { label: "Last login", key: "last_login" },
  { label: "Actions", key: "actions" },
];
const UsersTable: React.FC<UserTableProps> = ({ users }) => {
  const navigate = useNavigate();
  const handleEdit = (userId: number) => {
    navigate(`/users/${userId}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {/* Change to user.id once backend sends id */}
              {columns.map((column) => {
                if (column.key !== "actions") {
                  return (
                    <TableCell key={column.key}>
                      {user[column.key as keyof typeof user]}
                    </TableCell>
                  );
                }
              })}
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
