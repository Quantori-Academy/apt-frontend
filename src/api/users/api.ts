import { baseApi } from "../api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query({
      query: () => "/users",
    }),
  }),
  overrideExisting: true,
});
