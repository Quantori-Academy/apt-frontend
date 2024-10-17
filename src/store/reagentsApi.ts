import { Reagent } from "@/types";

import { baseApi } from "./baseApi";

export const reagentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReagentDetails: builder.query<Reagent, string>({
      query: (reagentId) => `/reagents/${reagentId}`,
      providesTags: ["Reagents"],
    }),
  }),
  overrideExisting: true,
});
export const { useGetReagentDetailsQuery } = reagentsApi;
