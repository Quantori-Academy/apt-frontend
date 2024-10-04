import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3010",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
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
