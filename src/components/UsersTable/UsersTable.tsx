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

import { useAppSelector } from "@/hooks";
import {
  AppProtectedRoutes,
  RouteProtectedPath,
} from "@/router/protectedRoutesRouterConfig";
import { selectUserId } from "@/store";
import { UserFrontendDetails } from "@/types";

type UserTableColumn = {
  label: string;
  key: string;
};

type UserTableProps = {
  users: UserFrontendDetails[];
};

const columns: UserTableColumn[] = [
  { label: "Username", key: "username" },
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Role", key: "role" },
  { label: "Last login", key: "lastLogin" },
  { label: "Actions", key: "actions" },
];

const UsersTable: React.FC<UserTableProps> = ({ users }) => {
  const navigate = useNavigate();

  const loggedInUserId = useAppSelector(selectUserId);

  const handleEdit = (selectedUserIdFromTable: string) => {
    if (selectedUserIdFromTable === loggedInUserId) {
      navigate(RouteProtectedPath[AppProtectedRoutes.ACCOUNT_SETTINGS]);
    } else {
      navigate(
        `${RouteProtectedPath[AppProtectedRoutes.USERS]}/${selectedUserIdFromTable}`
      );
    }
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
