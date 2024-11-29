import { OrderInput, ReagentRequests, RequestedReagentBackend } from "@/types";

import { requestsOrdersBaseApi } from "./requestsOrdersBaseApi";
import { transformOrderData, transformRequestData } from "./utils";

export const reagentRequestApi = requestsOrdersBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReagentRequests: builder.query<ReagentRequests, void>({
      query: () => "/requests",
      transformResponse: (baseQueryReturnValue: Array<RequestedReagentBackend>) => {
        return transformRequestData(baseQueryReturnValue);
      },
      providesTags: ["Requests"],
    }),
    getOwnReagentRequests: builder.query<ReagentRequests, string>({
      query: (userId) => `/requests/${userId}`,
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
            initial_quantity: newRequest.initialQuantity,
            unit: newRequest.unit,
            user_comment: newRequest.userComment,
            amount: newRequest.amount,
          },
        };
      },
      invalidatesTags: ["Requests"],
    }),
    editReagentRequest: builder.mutation({
      query: ({ editedRequest, requestId }) => {
        return {
          url: `requests/${requestId}`,
          method: "PUT",
          body: {
            reagent_name: editedRequest.reagentName,
            structure: editedRequest.structure,
            cas_number: editedRequest.CAS,
            quantity: editedRequest.desiredQuantity,
            unit: editedRequest.unit,
            user_comment: editedRequest.userComment,
            initial_quantity: editedRequest.initialQuantity,
            amount: editedRequest.amount,
          },
        };
      },
      invalidatesTags: ["Requests"],
    }),

    createOrderFromRequests: builder.mutation<void, OrderInput>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: transformOrderData(orderData),
      }),
      invalidatesTags: ["Requests"],
    }),
  }),
});

export const {
  useGetAllReagentRequestsQuery,
  useDeclineReagentRequestMutation,
  useAddReagentRequestMutation,
  useEditReagentRequestMutation,
  useGetOwnReagentRequestsQuery,
  useCreateOrderFromRequestsMutation,
} = reagentRequestApi;
