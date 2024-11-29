import { createApi } from "@reduxjs/toolkit/query/react";

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

import { fetchQuery } from "./fetchQuery";
import {
  transformReagentData,
  transformReagentResponse,
  transformSampleData,
  transformSampleResponse,
  transformSubstanceData,
} from "./utils";

type MutationSubstanceResponse = {
  status: number;
  data: {
    message: string;
  };
};

export type MutationPatchSubstance = {
  storageContentId: number;
  newLocationId: number;
};

export const substancesApi = createApi({
  reducerPath: "reagentsApi",
  baseQuery: fetchQuery,
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
    updateLocation: builder.mutation<MutationSubstanceResponse, MutationPatchSubstance>({
      query: ({ storageContentId, newLocationId }) => ({
        url: "/substances/location",
        method: "PATCH",
        body: {
          storage_content_id: storageContentId,
          new_location_id: newLocationId,
        },
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
      transformResponse: (response: BackendSample) => {
        console.log(response);
        return transformSampleResponse(response);
      },
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
  useUpdateLocationMutation,
} = substancesApi;
