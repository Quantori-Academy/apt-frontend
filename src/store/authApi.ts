import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { Token, UserLoginInput } from "@/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
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
