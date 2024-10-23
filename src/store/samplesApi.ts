import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { transformSampleData } from "@/store/utils/transformSampleData.ts";
import { SampleData } from "@/types/sampleData";

export const samplesApi = createApi({
  reducerPath: "samplesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Samples"],
  endpoints: (builder) => ({
    createSample: builder.mutation({
      query: (sample: SampleData) => ({
        url: "/substances/samples",
        method: "POST",
        body: transformSampleData(sample),
      }),
      invalidatesTags: ["Samples"],
    }),
  }),
});

export const { useCreateSampleMutation } = samplesApi;
