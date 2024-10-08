import { TUser } from "@/types";

import { baseApi } from "../baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<TUser[], void>({
      query: () => "/users/all",
    }),
  }),
  overrideExisting: true,
});
