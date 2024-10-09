import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { prepareHeaders } from "@/api";
import { UserBase } from "@/types";

const BASE_URL = import.meta.env.VITE_APP_API_URL as string;

type UserDetails = Omit<UserBase, "password" | "id">;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users/create",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    getUserDetails: builder.query<UserDetails, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: ["Users"],
    }),

    updateUserDetails: builder.mutation({
      query: ({ userId, updatedUserDetails }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: updatedUserDetails,
      }),
      invalidatesTags: ["Users"],
    }),

    updatePassword: builder.mutation({
      query: ({ userId, updatedPassword }) => ({
        url: `/users/${userId}/reset-password`,
        method: "PUT",
        body: { newPassword: updatedPassword },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useAddUserMutation, useGetUserDetailsQuery, useUpdateUserDetailsMutation, useUpdatePasswordMutation } =
  api;
