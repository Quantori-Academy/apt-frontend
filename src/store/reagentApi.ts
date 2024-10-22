import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { ReagentData } from "@/types/reagentData";

export const reagentApi = createApi({
  reducerPath: "reagentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),
  tagTypes: ["Reagents"],
  endpoints: (builder) => ({
    createReagent: builder.mutation({
      query: (reagent: ReagentData) => ({
        url: "/substances/reagents",
        method: "POST",
        body: {
          name: reagent.name,
          description: reagent.description,
          structure: reagent.structure,
          price_per_unit: reagent.price_per_unit || 0,
          quantity_unit: reagent.quantity_unit || "mL",
          quantity_left: reagent.quantity_left || 0,
          expiration_date: reagent.expiration_date || new Date().toISOString(),
          location_id: reagent.location_id || 0,
          cas_number: reagent.cas_number,
          producer: reagent.producer,
          catalog_id: reagent.catalog_id || 0,
          catalog_link: reagent.catalog_link || "",
        },
      }),
      invalidatesTags: ["Reagents"],
    }),
  }),
});

export const { useCreateReagentMutation } = reagentApi;
