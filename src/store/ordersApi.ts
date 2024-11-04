import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { BackendOrder, BackendOrderDetailPage, Order, OrderDetailPage, OrderInput } from "@/types";

import { transformOrderData, transformOrderDetailResponse, transformOrderResponse } from "./utils";

export const ordersApi = createApi({
  reducerPath: "OrdersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Orders"],
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
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation, useGetOrderQuery } = ordersApi;
