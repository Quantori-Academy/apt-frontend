import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { BackendSample, MutationSubstanceResponse, Sample } from "@/types";

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
    deleteSample: builder.mutation<MutationSubstanceResponse, string>({
      query: (sampleId) => {
        return {
          url: `/substances/${sampleId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Samples"],
    }),
  }),
});

export const { useGetSampleDetailsQuery, useDeleteSampleMutation } = sampleApi;
