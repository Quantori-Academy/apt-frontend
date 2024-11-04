import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { transformRequestData } from "@/store/utils/transformRequestData.ts";
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
    declineReagentRequest: builder.query<void, { requestId: number; declineMessage: string }>({
      query: ({ requestId, declineMessage }) => {
        return {
          url: `/reagents/requests/${requestId}`,
          method: "PUT",
          body: {
            declineMessage,
          },
        };
      },
      providesTags: ["Requests"],
    }),
    addReagentRequest: builder.mutation({
      query: (newRequest) => {
        console.log("am:", newRequest);
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
    }),
  }),
});

export const { useGetReagentRequestsQuery, useDeclineReagentRequestQuery, useAddReagentRequestMutation } =
  reagentRequestApi;
