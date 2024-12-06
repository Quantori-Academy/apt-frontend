import { createApi } from "@reduxjs/toolkit/query/react";

import { Token, UserLoginInput } from "@/types";

import { fetchQuery } from "./fetchQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    login: builder.mutation<Token, UserLoginInput>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "post",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
