import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@/api/apiMethods";
import { prepareHeaders } from "@/api/apiMethods";
import { BackendRoomData, BackendStorageRoomsBrief, RoomData, StorageRoomsBrief } from "@/types";

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
      transformResponse: (response: BackendStorageRoomsBrief[]) => response.map(transformStorageRoomsResponse),
      providesTags: ["StorageRooms"],
    }),

    getStorageLocationDetail: builder.query<RoomData, number>({
      query: (locationId) => `/storage/${locationId}`,
      transformResponse: (response: BackendRoomData) => transformStorageLocationResponse(response),
      providesTags: ["StorageRooms"],
    }),

    updateStorageRoom: builder.mutation<void, { roomId: number | null; room: string; description: string }>({
      query: ({ roomId, room, description }) => ({
        url: `/storage/${roomId}`,
        method: "PUT",
        body: {
          room,
          description,
        },
      }),
      invalidatesTags: ["StorageRooms"],
    }),

    createStorageRoom: builder.mutation({
      query: ({ roomId, locationName }) => ({
        url: "/storage/location",
        method: "POST",
        body: {
          room_id: roomId,
          location_name: locationName,
        },
      }),
      invalidatesTags: ["StorageRooms"],
    }),

    deleteStorageLocation: builder.mutation<void, number>({
      query: (locationId) => ({
        url: `/storage/${locationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StorageRooms"],
    }),

    moveSubstance: builder.mutation<
      void,
      {
        oldRoomId: number;
        substanceId: number;
        newLocationId: number;
      }
    >({
      query: ({ oldRoomId, substanceId, newLocationId }) => ({
        url: "/storage/move",
        method: "PUT",
        body: {
          old_location_id: oldRoomId,
          substance_id: substanceId,
          new_location_id: newLocationId,
        },
      }),
      invalidatesTags: ["StorageRooms"],
    }),
  }),
});

export const {
  useGetStorageRoomsQuery,
  useGetStorageLocationDetailQuery,
  useUpdateStorageRoomMutation,
  useCreateStorageRoomMutation,
  useDeleteStorageLocationMutation,
  useMoveSubstanceMutation,
} = storageApi;
