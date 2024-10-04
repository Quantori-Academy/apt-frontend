import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { prepareHeaders } from "@/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3010",
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => "/status",
    }),
    addUser: builder.mutation({
      query: () => ({
        url: "/users",
        method: "post",
      }),
    }),
  }),
});

export const { useGetStatusQuery, useAddUserMutation } = api;
