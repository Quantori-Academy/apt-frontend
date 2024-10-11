import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { prepareHeaders } from "@/api";
import { UserBase, UserRole } from "@/types";

const BASE_URL = import.meta.env.VITE_APP_API_URL as string;

type UserDetails = Omit<UserBase, "password" | "id">;

type UserDetailsResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  role: UserRole;
};

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
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),

    getUserDetails: builder.query<UserDetails, string>({
      query: (userId) => `/users/${userId}`,
      transformResponse: (baseQueryReturnValue: UserDetailsResponse) => ({
        id: baseQueryReturnValue.id,
        firstName: baseQueryReturnValue.first_name,
        lastName: baseQueryReturnValue.last_name,
        email: baseQueryReturnValue.email,
        username: baseQueryReturnValue.username,
        role: baseQueryReturnValue.role,
      }),
      providesTags: ["Users"],
    }),

    updateUserDetails: builder.mutation({
      query: ({ updatedUserDetails }) => ({
        url: `/users/${updatedUserDetails.id}`,
        method: "PUT",
        body: {
          username: updatedUserDetails.username,
          first_name: updatedUserDetails.firstName,
          last_name: updatedUserDetails.lastName,
          email: updatedUserDetails.email,
        },
      }),
      invalidatesTags: ["Users"],
    }),

    resetPassword: builder.mutation({
      query: ({ userId, newPassword }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { new_password: newPassword },
      }),
      invalidatesTags: ["Users"],
    }),

    updateRole: builder.mutation({
      query: ({ userId, updatedRole }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role: updatedRole },
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
  useUpdateRoleMutation,
  useDeleteUserMutation,
} = api;
