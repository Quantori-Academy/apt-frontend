import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { prepareHeaders } from "@/api";
import { BASE_URL } from "@/api/apiMethods";
import { UserDetails } from "@/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => "/status",
    }),
    getUsers: builder.query<UserDetails[], void>({
      query: () => "/users/all",
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: "/users/create",
        method: "post",
        body: userData,
      }),
    }),
  }),
});

export const { useGetStatusQuery, useAddUserMutation, useGetUsersQuery } = api;
