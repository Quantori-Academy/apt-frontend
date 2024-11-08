import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import {
  BackendOrder,
  BackendOrderDetailPage,
  MutationResponse,
  Order,
  OrderDetailPage,
  OrderInput,
  StatusForm,
  UpdatedReagent,
} from "@/types";

import {
  transformOrderData,
  transformOrderDetailResponse,
  transformOrderReagentData,
  transformOrderResponse,
} from "./utils";

type DeleteReagentIds = {
  orderId: string;
  reagentId: number;
};

type EditTitleSeller = {
  orderId: string;
  title: string;
  seller: string;
};

type UpdateOrderStatus = {
  orderId: string;
  status: StatusForm;
};

export const ordersApi = createApi({
  reducerPath: "OrdersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Orders", "Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      transformResponse: (response: BackendOrder[]) => response.map(transformOrderResponse),
      providesTags: ["Orders"],
    }),

    createOrder: builder.mutation<void, OrderInput>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: transformOrderData(orderData),
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrder: builder.query<OrderDetailPage, string>({
      query: (orderId) => `orders/${orderId}`,
      transformResponse: (response: BackendOrderDetailPage) => transformOrderDetailResponse(response),
      providesTags: ["Order"],
    }),

    editOrderTitleSeller: builder.mutation<void, EditTitleSeller>({
      query: ({ orderId, title, seller }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: {
          title,
          seller,
        },
      }),
      invalidatesTags: ["Order"],
      transformErrorResponse: (response: MutationResponse) => {
        return {
          message: response.data?.message || "An unexpected error occurred.",
        };
      },
    }),

    updateOrderStatus: builder.mutation<void, UpdateOrderStatus>({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: ["Order"],
      transformErrorResponse: (response: MutationResponse) => {
        return {
          message: response.data?.message || "An unexpected error occurred.",
        };
      },
    }),

    updateOrderReagent: builder.mutation<void, UpdatedReagent>({
      query: (updatedReagent) => ({
        url: `/orders/${updatedReagent.orderId}/reagent/${updatedReagent.id}`,
        method: "PUT",
        body: transformOrderReagentData(updatedReagent),
      }),
      invalidatesTags: ["Order"],
    }),

    deleteReagentFromOrder: builder.mutation<void, DeleteReagentIds>({
      query: ({ orderId, reagentId }) => ({
        url: `/orders/${orderId}/reagent/${reagentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useUpdateOrderReagentMutation,
  useDeleteReagentFromOrderMutation,
  useEditOrderTitleSellerMutation,
  useUpdateOrderStatusMutation,
} = ordersApi;
