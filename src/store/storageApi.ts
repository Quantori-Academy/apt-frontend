import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@/api/apiMethods";
import { prepareHeaders } from "@/api/apiMethods";
import { BackEndRoomData, BackEndStorageRoomsBrief, RoomData, StorageRoomsBrief } from "@/types";

import { transformStorageLocationResponse, transformStorageRoomsResponse } from "./utils/transformStorageResponse";

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
      transformResponse: (response: BackEndStorageRoomsBrief[]) => response.map(transformStorageRoomsResponse),
      providesTags: ["StorageRooms"],
    }),
    getStorageLocationDetail: builder.query<RoomData, number>({
      query: (locationId) => `/storage/${locationId}`,
      transformResponse: (response: BackEndRoomData) => transformStorageLocationResponse(response),
      providesTags: (_, __, locationId) => [{ type: "StorageRooms", id: locationId }],
    }),
  }),
});

export const { useGetStorageRoomsQuery, useGetStorageLocationDetailQuery } = storageApi;
