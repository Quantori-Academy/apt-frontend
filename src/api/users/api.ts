import { TUser } from "@/types";

import { baseApi } from "../api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<TUser[], void>({
      query: () => "/users",
    }),
  }),
  overrideExisting: true,
});
