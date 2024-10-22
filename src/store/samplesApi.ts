import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
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
        body: {
          name: sample.name,
          description: sample.description,
          structure: sample.structure,
          price_per_unit: sample.price_per_unit || 0,
          quantity_unit: sample.quantity_unit || "mL",
          quantity_left: sample.quantity_left || 0,
          expiration_date: sample.expiration_date || new Date().toISOString(),
          location_id: sample.location_id || 0,
          added_substance_ids: sample.added_substance_ids || [],
        },
      }),
      invalidatesTags: ["Samples"],
    }),
  }),
});

export const { useCreateSampleMutation } = samplesApi;
