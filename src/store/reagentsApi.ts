import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { BackEndReagent, FrontEndReagent } from "@/types";

import { transformReagentResponse } from "./utils/transformReagentResponse";

type MutationReagentResponse = {
  status: number;
  data: {
    message: string;
  };
};

export const reagentsApi = createApi({
  reducerPath: "reagentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Reagents"],

  endpoints: (builder) => ({
    getReagentDetails: builder.query<FrontEndReagent, string>({
      query: (reagentId) => `/substances/reagents/${reagentId}`,
      transformResponse: (response: BackEndReagent) => transformReagentResponse(response),
      providesTags: ["Reagents"],
    }),

    deleteReagent: builder.mutation<MutationReagentResponse, string>({
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
