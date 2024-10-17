import { reagentDetails } from "@/mockData/reagentDetails";
import { Reagent } from "@/types";

import { baseApi } from "./baseApi";

export const reagentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReagentDetails: builder.query<Reagent, string>({
      // query: (reagentId) => `/reagents/${reagentId}`,
      queryFn: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: reagentDetails });
          }, 100);
        });
      },
      providesTags: ["Reagents"],
    }),
    deleteReagent: builder.mutation({
      query: (reagentId) => ({
        url: `reagents/${reagentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reagents"],
    }),
  }),
  overrideExisting: true,
});
export const { useGetReagentDetailsQuery, useDeleteReagentMutation } = reagentsApi;
