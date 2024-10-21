import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { BackEndSample, FrontEndSample } from "@/types/sample";

import { transformSampleResponse } from "./utils/transformSampleResponse";

export const sampleApi = createApi({
  reducerPath: "sampleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Samples"],
  endpoints: (builder) => ({
    getSampleDetails: builder.query<FrontEndSample, string>({
      query: (sampleId) => `/substances/samples/${sampleId}`,
      transformResponse: (response: BackEndSample) => transformSampleResponse(response),
      providesTags: ["Samples"],
    }),
  }),
});

export const { useGetSampleDetailsQuery } = sampleApi;
