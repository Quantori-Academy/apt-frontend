import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { BackendOrder, Order, OrderInput } from "@/types";

import { transformOrderData } from "./utils";
import { transformOrderResponse } from "./utils/transformOrderResponse";

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
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = ordersApi;
