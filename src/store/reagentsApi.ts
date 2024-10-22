import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { BackendReagent, MutationSubstanceResponse, Reagent } from "@/types";

import { transformReagentResponse } from "./utils";

export const reagentsApi = createApi({
  reducerPath: "reagentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Reagents"],

  endpoints: (builder) => ({
    getReagentDetails: builder.query<Reagent, string>({
      query: (reagentId) => `/substances/reagents/${reagentId}`,
      transformResponse: (response: BackendReagent) => transformReagentResponse(response),
      providesTags: ["Reagents"],
    }),

    deleteReagent: builder.mutation<MutationSubstanceResponse, string>({
      query: (reagentId) => {
        return {
          url: `/substances/${reagentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reagents"],
    }),

    updateReagent: builder.mutation({
      query: (updatedReagentDetails) => ({
        url: `/substances/reagents/${updatedReagentDetails.id}`,
        method: "PUT",
        body: {
          quantity_left: updatedReagentDetails.quantity,
          storage_location: updatedReagentDetails.storageLocation,
        },
      }),
      invalidatesTags: ["Reagents"],
    }),
  }),
});

export const { useGetReagentDetailsQuery, useDeleteReagentMutation, useUpdateReagentMutation } = reagentsApi;
