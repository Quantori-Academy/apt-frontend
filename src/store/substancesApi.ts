import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { SubstancesResponse, transformSubstanceList } from "@/store/utils/transformSubstanceList.ts";
import { Reagent, SubstancesDetails } from "@/types";

import { reagentDetails } from "../../mock";

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
    getReagentDetails: builder.query<Reagent, string>({
      // query: (reagentId) => `/reagents/${reagentId}`,
      queryFn: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: reagentDetails });
          }, 100);
        });
      },
      providesTags: ["Substances"],
    }),
    deleteSubstance: builder.mutation({
      query: (substanceId) => ({
        url: `substances/${substanceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Substances"],
    }),
  }),
});
export const { useGetReagentDetailsQuery, useDeleteSubstanceMutation, useGetSubstancesQuery } = substancesApi;
