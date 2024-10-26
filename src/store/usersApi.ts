import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { UserBackendDetails, UserBase, UserFrontendDetails, UserRegisterData, UserRole } from "@/types";

import { transformUserResponse } from "./utils";

// TODO. Think of backend-to-frontend object fields mapper
// const keysForBackend: Pick<UserRegisterInput, "firstName" | "lastName"> = {
//   firstName: "first_name",
//   lastName: "last_name",
// };

// TODO. Get rid of doubles. Maybe use UserBackendDetails?
type UserDetails = Omit<UserBase, "password" | "id">;

type UserFromBackend = Omit<UserRegisterData, "firstName" | "lastName"> & {
  first_name: string;
  last_name: string;
};

type UserDetailsResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  role: UserRole;
};

export const usersApi = createApi({
  reducerPath: "UsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserFrontendDetails[], void>({
      query: () => "/users",
      transformResponse: (response: UserBackendDetails[]) => response.map(transformUserResponse),
      providesTags: (result) => {
        if (result && Array.isArray(result)) {
          return [...result.map(({ id }) => ({ type: "Users" as const, id })), { type: "Users", id: "LIST" }];
        }
        return [{ type: "Users", id: "LIST" }];
      },
    }),

    addUser: builder.mutation<UserBackendDetails, UserRegisterData>({
      query: (userData) => ({
        url: "/users",
        method: "post",
        body: (() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { firstName, lastName, ...rest } = userData;
          const result: UserFromBackend = {
            ...rest,
            first_name: userData.firstName,
            last_name: userData.lastName,
          };
          return result;
        })(),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: createdUser } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData("getUsers", undefined, (draft: UserFrontendDetails[]) => {
              draft.push(transformUserResponse(createdUser));
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
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
      query: (updatedUserDetails) => {
        return {
          url: `/users/${updatedUserDetails.id}`,
          method: "PUT",
          body: {
            first_name: updatedUserDetails.firstName,
            last_name: updatedUserDetails.lastName,
            email: updatedUserDetails.email,
          },
        };
      },
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
  useUpdateRoleMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useAddUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
} = usersApi;
