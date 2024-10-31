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
import { useTranslation } from "react-i18next";
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
  { label: "users.table.username", key: "username" },
  { label: "users.table.firstName", key: "firstName" },
  { label: "users.table.lastName", key: "lastName" },
  { label: "users.table.email", key: "email" },
  { label: "users.table.role", key: "role" },
  { label: "users.table.lastLogin", key: "lastLogin" },
  { label: "users.table.actions", key: "actions" },
];

const UsersTable: React.FC<UserTableProps> = ({ users }) => {
  const { t } = useTranslation();

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
              <TableCell key={column.key}>{t(column.label)}</TableCell>
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
                      {column.key === "role"
                        ? t(`users.roles.${user[column.key]}`)
                        : user[column.key as keyof typeof user]}
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
                  {t("buttons.edit")}
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
