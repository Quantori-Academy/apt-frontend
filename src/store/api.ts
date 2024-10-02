import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:3010",
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: () => ({
        url: "/users",
        method: "post",
      }),
    }),
  }),
});

export const { useAddUserMutation } = api;
