import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@/api/apiMethods";
import { prepareHeaders } from "@/api/apiMethods";
import { BackRoomData, BackStorageRoomsBrief, FrontRoomData, FrontStorageRoomsBrief } from "@/types";

import { transformStorageLocationResponse, transformStorageRoomsResponse } from "./utils/transformStorageResponse";

export const storageApi = createApi({
  reducerPath: "storageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
  }),

  tagTypes: ["StorageRooms"],
  endpoints: (builder) => ({
    getStorageRooms: builder.query<FrontStorageRoomsBrief[], void>({
      query: () => "/storage",
      transformResponse: (response: BackStorageRoomsBrief[]) => response.map(transformStorageRoomsResponse),
      providesTags: ["StorageRooms"],
    }),
    getStorageLocationDetail: builder.query<FrontRoomData, number>({
      query: (locationId) => `/storage/${locationId}`,
      transformResponse: (response: BackRoomData) => transformStorageLocationResponse(response),
      providesTags: (_, __, locationId) => [{ type: "StorageRooms", id: locationId }],
    }),
  }),
});

export const { useGetStorageRoomsQuery, useGetStorageLocationDetailQuery } = storageApi;
