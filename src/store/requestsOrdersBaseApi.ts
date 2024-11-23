import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";

export const requestsOrdersBaseApi = createApi({
  reducerPath: "requestsOrdersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Requests", "Orders", "Order"],
  endpoints: () => ({}),
});
