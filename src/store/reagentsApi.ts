import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { Reagent } from "@/types";

import { reagentDetails } from "../../mock";

export const reagentsApi = createApi({
  reducerPath: "reagentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Reagents"],
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
      providesTags: ["Reagents"],
    }),
    deleteReagent: builder.mutation({
      query: (reagentId) => ({
        url: `reagents/${reagentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reagents"],
    }),
  }),
});
export const { useGetReagentDetailsQuery, useDeleteReagentMutation } = reagentsApi;
