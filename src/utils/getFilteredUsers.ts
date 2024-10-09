import { RoleFilterState } from "@/pages/Users/Users";
import { UserBackendDetails } from "@/types";

export const getFilteredUsers = (users: UserBackendDetails[], searchQuery: string, roleFilter: RoleFilterState) => {
  const lowerCaseQuery = searchQuery.toLowerCase();

  return users.filter((user) => {
    const matchesSearchQuery =
      user.first_name.toLowerCase().includes(lowerCaseQuery) ||
      user.last_name.toLowerCase().includes(lowerCaseQuery) ||
      user.email.toLowerCase().includes(lowerCaseQuery) ||
      user.username.toLowerCase().includes(lowerCaseQuery);

    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    return matchesSearchQuery && matchesRole;
  });
};
