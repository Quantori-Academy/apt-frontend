import { createApi } from "@reduxjs/toolkit/query/react";

import {
  BackendOrder,
  BackendOrderDetailPage,
  MutationResponse,
  Order,
  OrderDetailPage,
  OrderInput,
  OrderReagent,
  OrderStatus,
} from "@/types";

import { fetchQuery } from "./fetchQuery";
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

type AddReagentsToOrder = OrderInput & {
  orderId: string;
};

type EditTitleSeller = {
  orderId: string;
  title: string | null;
  seller: string | null;
};

type UpdateOrderStatus = {
  orderId: string;
  status: OrderStatus;
};

type Allocation = {
  orderId: string;
  locationId: string;
  reagentIds: number[];
};

export const ordersApi = createApi({
  reducerPath: "OrdersApi",
  baseQuery: fetchQuery,
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
      invalidatesTags: ["Order", "Orders"],
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
        body: { status },
      }),
      invalidatesTags: ["Order", "Orders"],
      transformErrorResponse: (response: MutationResponse) => {
        return {
          message: response.data?.message || "An unexpected error occurred.",
        };
      },
    }),

    chooseLocation: builder.mutation<void, Allocation>({
      query: ({ orderId, locationId, reagentIds }) => ({
        url: `orders/${orderId}/allocate`,
        method: "POST",
        body: {
          location_id: locationId,
          reagentIds,
        },
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrderReagent: builder.mutation<void, { orderId: string; reagent: OrderReagent }>({
      query: ({ orderId, reagent }) => ({
        url: `/orders/${orderId}/reagents/${reagent.id}`,
        method: "PUT",
        body: transformOrderReagentData(reagent),
      }),
      invalidatesTags: ["Order"],
    }),

    addReagentsToOrder: builder.mutation<void, AddReagentsToOrder>({
      query: (newReagentsData) => ({
        url: `/orders/${newReagentsData.orderId}/reagents`,
        method: "POST",
        body: transformOrderData(newReagentsData).reagents,
      }),
      invalidatesTags: ["Order"],
    }),

    deleteReagentFromOrder: builder.mutation<void, DeleteReagentIds>({
      query: ({ orderId, reagentId }) => ({
        url: `/orders/${orderId}/reagents/${reagentId}`,
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
  useChooseLocationMutation,
  useAddReagentsToOrderMutation,
} = ordersApi;
