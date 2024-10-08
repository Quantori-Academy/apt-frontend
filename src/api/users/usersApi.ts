import { UserDetails } from "@/types";

import { baseApi } from "../baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<UserDetails[], void>({
      query: () => "/users/all",
    }),
  }),
  overrideExisting: true,
});
