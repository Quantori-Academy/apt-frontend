import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, getHeaders } from "./apiMethods";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const dynamicHeaders = getHeaders();
      dynamicHeaders.forEach((value, key) => {
        headers.set(key, value);
      });

      return headers;
    },
  }),
  endpoints: () => ({}),
});
