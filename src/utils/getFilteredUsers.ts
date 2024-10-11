import { RoleFilterState } from "@/pages/Users/Users";
import { UserFrontendDetails } from "@/types";

export const getFilteredUsers = (users: UserFrontendDetails[], searchQuery: string, roleFilter: RoleFilterState) => {
  const lowerCaseQuery = searchQuery.toLowerCase();

  return users.filter((user) => {
    const matchesSearchQuery =
      user.firstName.toLowerCase().includes(lowerCaseQuery) ||
      user.lastName.toLowerCase().includes(lowerCaseQuery) ||
      user.email.toLowerCase().includes(lowerCaseQuery) ||
      user.username.toLowerCase().includes(lowerCaseQuery);

    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    return matchesSearchQuery && matchesRole;
  });
};
