import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { prepareHeaders } from "@/api";

const BASE_URL = import.meta.env.VITE_APP_API_URL as string;

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
    addUser: builder.mutation({
      query: () => ({
        url: "/users",
        method: "post",
      }),
    }),
  }),
});

export const { useGetStatusQuery, useAddUserMutation } = api;
