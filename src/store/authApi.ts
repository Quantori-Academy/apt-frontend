import { createApi } from "@reduxjs/toolkit/query/react";

import { Token, UserLoginInput } from "@/types";

import { fetchQuery } from "./fetchQuery.ts";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    login: builder.mutation<Token, UserLoginInput>({
      query: (credentials) => ({
        url: "/users/login",
        method: "post",
        body: credentials,
      }),
      transformErrorResponse(response): string {
        const error = response.data;

        return error && typeof error === "object" && "message" in error
          ? (error.message as string)
          : "An unknown error occurred";
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
