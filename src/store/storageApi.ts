import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@/api/apiMethods";
import { RoomData, StorageRoomsBrief } from "@/types";

export const storageApi = createApi({
  reducerPath: "storageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["StorageRooms"],
  endpoints: (builder) => ({
    getStorageRooms: builder.query<StorageRoomsBrief[], void>({
      query: () => "/storage",
      providesTags: ["StorageRooms"],
    }),

    getStorageLocationDetail: builder.query<RoomData, number>({
      query: (locationId) => `/storage/${locationId}`,
      providesTags: (_, __, locationId) => [{ type: "StorageRooms", id: locationId }],
    }),

    updateStorageRoom: builder.mutation<void, { roomId: number; room: string; description: string }>({
      query: ({ roomId, room, description }) => ({
        url: `/storage/${roomId}`,
        method: "PUT",
        body: {
          room,
          description,
        },
      }),
      invalidatesTags: [{ type: "StorageRooms", id: "LIST" }],
    }),

    createStorageRoom: builder.mutation<{ id: number; location: string }, { room_id: number; location_name: string }>({
      query: ({ room_id, location_name }) => ({
        url: "/storage",
        method: "POST",
        body: {
          room_id,
          location_name,
        },
      }),
    }),

    deleteStorageLocation: builder.mutation<void, number>({
      query: (locationId) => ({
        url: `/storage/${locationId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "StorageRooms", id: "LIST" }],
    }),

    moveSubstance: builder.mutation<
      void,
      {
        old_room_id: number;
        old_location_id: number;
        substance_id: number;
        new_room_id: number;
        new_location_id: number;
      }
    >({
      query: ({ old_room_id, old_location_id, substance_id, new_room_id, new_location_id }) => ({
        url: "/storage/move",
        method: "PUT",
        body: {
          old_room_id,
          old_location_id,
          substance_id,
          new_room_id,
          new_location_id,
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
