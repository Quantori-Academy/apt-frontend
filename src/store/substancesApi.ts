import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { transformSubstanceList } from "@/store/utils/transformSubstanceList.ts";
import { Reagent, SubstancesDetails } from "@/types";

import { reagentDetails, substancesObj } from "../../mock";

export const substancesApi = createApi({
  reducerPath: "reagentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Substances"],
  endpoints: (builder) => ({
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
    getSubstances: builder.query<Array<SubstancesDetails>, void>({
      queryFn: async () => {
        return { data: transformSubstanceList(substancesObj) };
      },
      providesTags: ["Substances"],
    }),
  }),
});
export const { useGetReagentDetailsQuery, useDeleteSubstanceMutation, useGetSubstancesQuery } = substancesApi;
