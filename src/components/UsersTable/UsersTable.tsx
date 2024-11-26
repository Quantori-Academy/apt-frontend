import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ScrollableTable } from "@/components/ScrollableTable";
import { useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import { selectUserId } from "@/store";
import { UserFrontendDetails } from "@/types";

type UserTableColumn = {
  label: string;
  key: string;
};

type UserTableProps = {
  users: UserFrontendDetails[];
  page: number;
  setPage: (page: number) => void;
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

const UsersTable: React.FC<UserTableProps> = ({ users, page, setPage }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const loggedInUserId = useAppSelector(selectUserId);

  const handleEdit = (selectedUserIdFromTable: string) => {
    if (selectedUserIdFromTable === loggedInUserId) {
      navigate(RouteProtectedPath.accountSettings);
    } else {
      navigate(`${RouteProtectedPath.users}/${selectedUserIdFromTable}`);
    }
  };

  const paginatedUsers = (
    users: Array<UserFrontendDetails>,
    page: number,
    pageSize: number
  ) => {
    return users.slice(page * pageSize, (page + 1) * pageSize);
  };

  const onChangePageSize = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ScrollableTable
      paginationComponent={
        <TablePagination
          sx={{ backgroundColor: "#f5f5f5" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => setPage(page)}
          onRowsPerPageChange={onChangePageSize}
        />
      }
    >
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.key}>{t(column.label)}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedUsers(users, page, rowsPerPage).map((user) => (
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
    </ScrollableTable>
  );
};

export default UsersTable;
