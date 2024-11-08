import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import {
  BackendReagent,
  BackendSample,
  Reagent,
  ReagentData,
  Sample,
  SampleData,
  SubstancesDetails,
  SubstancesResponse,
} from "@/types";

import {
  transformReagentData,
  transformReagentResponse,
  transformSampleData,
  transformSampleResponse,
  transformSubstanceData,
  transformSubstancePatchRequest,
} from "./utils";

type MutationSubstanceResponse = {
  status: number;
  data: {
    message: string;
  };
};

export type MutationPatchSubstance = {
  id: string;
  oldLocationId: string;
  quantity: string;
  newLocationId?: string;
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
      transformResponse: (baseQueryReturnValue: SubstancesResponse) => {
        return transformSubstanceData(baseQueryReturnValue);
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

    createReagent: builder.mutation({
      query: (reagent: ReagentData) => ({
        url: "/substances/reagents",
        method: "POST",
        body: transformReagentData(reagent),
      }),
      invalidatesTags: ["Substances"],
    }),
    createSample: builder.mutation({
      query: (sample: SampleData) => {
        return {
          url: "/substances/samples",
          method: "POST",
          body: transformSampleData(sample),
        };
      },
      invalidatesTags: ["Substances"],
    }),
    updateSubstance: builder.mutation<MutationSubstanceResponse, MutationPatchSubstance>({
      query: (updatedSubstanceDetails) => ({
        url: `/substances/${updatedSubstanceDetails.id}`,
        method: "PATCH",
        body: transformSubstancePatchRequest(updatedSubstanceDetails),
      }),
      invalidatesTags: ["Substances"],
    }),

    getReagentDetails: builder.query<Reagent, string>({
      query: (reagentId) => `/substances/reagents/${reagentId}`,
      transformResponse: (response: BackendReagent) => transformReagentResponse(response),
      providesTags: ["Substances"],
    }),
    getSampleDetails: builder.query<Sample, string>({
      query: (sampleId) => `/substances/samples/${sampleId}`,
      transformResponse: (response: BackendSample) => transformSampleResponse(response),
      providesTags: ["Substances"],
    }),
  }),
});

export const {
  useGetSubstancesQuery,
  useGetReagentDetailsQuery,
  useDeleteSubstanceMutation,
  useCreateSampleMutation,
  useCreateReagentMutation,
  useGetSampleDetailsQuery,
  useUpdateSubstanceMutation,
} = substancesApi;
