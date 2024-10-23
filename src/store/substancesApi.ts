import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { BackendReagent, BackendSample, Reagent, Sample, SubstancesDetails, SubstancesResponse } from "@/types";

import { transformReagentResponse, transformSampleResponse, transformSubstanceList } from "./utils";

type MutationSubstanceResponse = {
  status: number;
  data: {
    message: string;
  };
};

export const substancesApi = createApi({
  reducerPath: "reagentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Substances"],
  endpoints: (builder) => ({
    getSubstances: builder.query<Array<SubstancesDetails>, void>({
      query: () => "/substances",
      transformResponse(baseQueryReturnValue: SubstancesResponse) {
        return transformSubstanceList(baseQueryReturnValue);
      },
      providesTags: ["Substances"],
    }),
    deleteSubstance: builder.mutation<MutationSubstanceResponse, string>({
      query: (substanceId) => ({
        url: `substances/${substanceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Substances"],
    }),

    getReagentDetails: builder.query<Reagent, string>({
      query: (reagentId) => `/substances/reagents/${reagentId}`,
      transformResponse: (response: BackendReagent) => transformReagentResponse(response),
      providesTags: ["Substances"],
    }),
    updateReagent: builder.mutation({
      query: (updatedReagentDetails) => ({
        url: `/substances/reagents/${updatedReagentDetails.id}`,
        method: "PUT",
        body: {
          newQuantityLeft: updatedReagentDetails.quantity,
          location_id: updatedReagentDetails.locationId,
        },
      }),
      invalidatesTags: ["Substances"],
    }),

    getSampleDetails: builder.query<Sample, string>({
      query: (sampleId) => `/substances/samples/${sampleId}`,
      transformResponse: (response: BackendSample) => transformSampleResponse(response),
      providesTags: ["Substances"],
    }),
    updateSample: builder.mutation({
      query: (updatedSampleDetails) => ({
        url: `/substances/samples/${updatedSampleDetails.id}`,
        method: "PUT",
        body: {
          newQuantityLeft: updatedSampleDetails.quantity,
          location_id: updatedSampleDetails.locationId,
        },
      }),
      invalidatesTags: ["Substances"],
    }),
  }),
});

export const {
  useGetReagentDetailsQuery,
  useDeleteSubstanceMutation,
  useGetSubstancesQuery,
  useUpdateReagentMutation,
  useGetSampleDetailsQuery,
  useUpdateSampleMutation,
} = substancesApi;
