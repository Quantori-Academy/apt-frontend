import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { transformReagentData } from "@/store/utils/transformReagentData.ts";
import { ReagentData } from "@/types/reagentData";

export const reagentApi = createApi({
  reducerPath: "reagentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Reagents"],
  endpoints: (builder) => ({
    createReagent: builder.mutation({
      query: (reagent: ReagentData) => ({
        url: "/substances/reagents",
        method: "POST",
        body: transformReagentData(reagent),
      }),
      invalidatesTags: ["Reagents"],
    }),
  }),
});

export const { useCreateReagentMutation } = reagentApi;
