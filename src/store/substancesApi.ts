import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { transformReagentData } from "@/store/utils/transformReagentData.ts";
import { transformReagentResponse } from "@/store/utils/transformReagentResponse.ts";
import { transformSampleData } from "@/store/utils/transformSampleData.ts";
import { transformSubstanceList } from "@/store/utils/transformSubstanceList.ts";
import { BackendReagent, Reagent, ReagentData, SubstancesDetails, SubstancesResponse } from "@/types";
import { SampleData } from "@/types/sampleData.ts";

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
    createSample: builder.mutation({
      query: (sample: SampleData) => ({
        url: "/substances/samples",
        method: "POST",
        body: transformSampleData(sample),
      }),
      invalidatesTags: ["Substances"],
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
    createReagent: builder.mutation({
      query: (reagent: ReagentData) => ({
        url: "/substances/reagents",
        method: "POST",
        body: transformReagentData(reagent),
      }),
      invalidatesTags: ["Substances"],
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
      invalidatesTags: ["Substances"],
    }),
  }),
});
export const {
  useGetReagentDetailsQuery,
  useDeleteSubstanceMutation,
  useGetSubstancesQuery,
  useUpdateReagentMutation,
  useCreateSampleMutation,
  useCreateReagentMutation,
} = substancesApi;
