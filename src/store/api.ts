import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { prepareHeaders } from "@/api";
import { BASE_URL } from "@/api/apiMethods";
import { UserBackendDetails } from "@/types";
import { UserBase } from "@/types";

type UserDetails = Omit<UserBase, "password" | "id">;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => "/status",
    }),
    getUsers: builder.query<UserBackendDetails[], void>({
      query: () => "/users/all",
      providesTags: (result) => {
        if (result && Array.isArray(result)) {
          return [...result.map(({ id }) => ({ type: "Users" as const, id })), { type: "Users", id: "LIST" }];
        }
        return [{ type: "Users", id: "LIST" }];
      },
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: "/users/create",
        method: "post",
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: createdUser } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getUsers", undefined, (draft: UserBackendDetails[]) => {
              draft.push(createdUser);
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
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
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useGetUserDetailsQuery, useUpdateUserDetailsMutation } = api;
