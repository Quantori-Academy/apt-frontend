import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { ReagentRequests } from "@/types";

import { reagentRequestsMock } from "../../mock/reagentRequestsMock.ts";

export const reagentRequestApi = createApi({
  reducerPath: "requestsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Requests"],
  endpoints: (builder) => ({
    getReagentRequests: builder.query<ReagentRequests, void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: reagentRequestsMock };
      },

      providesTags: ["Requests"],
    }),
  }),
});

export const { useGetReagentRequestsQuery } = reagentRequestApi;
