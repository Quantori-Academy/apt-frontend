import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { BackendSample, Sample } from "@/types";

import { transformSampleResponse } from "./utils";

export const sampleApi = createApi({
  reducerPath: "sampleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Samples"],
  endpoints: (builder) => ({
    getSampleDetails: builder.query<Sample, string>({
      query: (sampleId) => `/substances/samples/${sampleId}`,
      transformResponse: (response: BackendSample) => transformSampleResponse(response),
      providesTags: ["Samples"],
    }),
  }),
});

export const { useGetSampleDetailsQuery } = sampleApi;
