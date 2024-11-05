import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { transformRequestData } from "@/store/utils";
import { ReagentRequests, RequestedReagentBackend } from "@/types";

export const reagentRequestApi = createApi({
  reducerPath: "requestsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Requests"],
  endpoints: (builder) => ({
    getReagentRequests: builder.query<ReagentRequests, void>({
      query: () => "/requests",
      transformResponse: (baseQueryReturnValue: Array<RequestedReagentBackend>) => {
        return transformRequestData(baseQueryReturnValue);
      },
      providesTags: ["Requests"],
    }),
    declineReagentRequest: builder.mutation<void, { requestId: string; declineMessage: string }>({
      query: ({ requestId, declineMessage }) => {
        return {
          url: `/requests/${requestId}/decline`,
          method: "PATCH",
          body: {
            comment: declineMessage,
          },
        };
      },
      invalidatesTags: ["Requests"],
    }),
    addReagentRequest: builder.mutation({
      query: (newRequest) => {
        return {
          url: `/requests`,
          method: "POST",
          body: {
            reagent_name: newRequest.reagentName,
            structure: newRequest.structure,
            cas_number: newRequest.CAS,
            quantity: newRequest.desiredQuantity,
            unit: newRequest.unit,
            user_comment: newRequest.userComment,
          },
        };
      },
      invalidatesTags: ["Requests"],
    }),
  }),
});

export const { useGetReagentRequestsQuery, useDeclineReagentRequestMutation, useAddReagentRequestMutation } =
  reagentRequestApi;
