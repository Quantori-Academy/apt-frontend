import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { ReagentDetails } from "@/types";

import { reagentsAndSamplesMock } from "../../mock";

export const reagentSampleApi = createApi({
  reducerPath: "ReagentSampleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["ReagentsSample"],
  endpoints: (builder) => ({
    getReagentSampleList: builder.query<Array<ReagentDetails>, void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { data: reagentsAndSamplesMock };
      },
      providesTags: ["ReagentsSample"],
    }),
  }),
});

export const { useGetReagentSampleListQuery } = reagentSampleApi;
