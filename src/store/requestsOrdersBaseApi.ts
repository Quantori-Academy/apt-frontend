import { createApi } from "@reduxjs/toolkit/query/react";

import { fetchQuery } from "./fetchQuery";

export const requestsOrdersBaseApi = createApi({
  reducerPath: "requestsOrdersApi",
  baseQuery: fetchQuery,
  tagTypes: ["Requests", "Orders"],
  endpoints: () => ({}),
});
