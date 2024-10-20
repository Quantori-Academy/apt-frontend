import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@/api/apiMethods";
import { prepareHeaders } from "@/api/apiMethods";
import { StorageRoomsBrief } from "@/types";

export const storageApi = createApi({
  reducerPath: "storageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),

  tagTypes: ["StorageRooms"],
  endpoints: (builder) => ({
    getStorageRooms: builder.query<StorageRoomsBrief[], void>({
      query: () => "/storage",
      providesTags: ["StorageRooms"],
      //add transformResponse
    }),
  }),
});

export const { useGetStorageRoomsQuery } = storageApi;
