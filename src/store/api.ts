import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { prepareHeaders } from "@/api";
import { BASE_URL } from "@/api/apiMethods";
import { UserBackendDetails, UserBase, UserRegisterData } from "@/types";

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

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserBackendDetails[], void>({
      query: () => "/users",
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

    resetPassword: builder.mutation({
      query: ({ userId, resetedPassword }) => ({
        url: `/users/${userId}/reset-password`,
        method: "PUT",
        body: { newPassword: resetedPassword },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
} = api;
