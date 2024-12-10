import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AddUserModal,
  DashboardBreadcrumbs,
  PageError,
  PageLoader,
  RoleFilter,
  SearchBar,
  SearchResultEmpty,
  UsersTable,
} from "@/components";
import { useGetUsersQuery } from "@/store";
import { UserRole } from "@/types";
import { getFilteredUsers } from "@/utils";

export type RoleFilterState = UserRole | "All";

const Users: React.FC = () => {
  const { t } = useTranslation();

  const { data: users, isLoading } = useGetUsersQuery();

  const [openModal, setOpenModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilterState>("All");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [roleFilter, searchQuery]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!users) {
    return <PageError text={t("users.errors.loadError")} />;
  }

  const filteredUsers =
    users && getFilteredUsers(users, searchQuery.toLowerCase(), roleFilter);

  return (
    <Container>
      <DashboardBreadcrumbs />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: "30px",
        }}
      >
        <Typography variant="h3">{t("users.title")}</Typography>
        <Button onClick={() => setOpenModal(true)} variant="outlined">
          {t("users.buttons.addUser")}
        </Button>
        <AddUserModal open={openModal} onClose={() => setOpenModal(false)} />
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
      {!filteredUsers.length ? (
        <SearchResultEmpty />
      ) : (
        <UsersTable users={filteredUsers} page={page} setPage={setPage} />
      )}
    </Container>
  );
};

export default Users;
