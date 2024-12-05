import { createApi } from "@reduxjs/toolkit/query/react";

import {
  BackendRoomData,
  BackendStorageRoomsBrief,
  MoveSubstance,
  NewRoom,
  NewStorageRoom,
  RoomData,
  StorageRoomsBrief,
  SubstancesTotalQuantity,
  SubstancesTotalQuantityResponse,
  UpdateStorageRoom,
} from "@/types";

import { fetchQuery } from "./fetchQuery";
import {
  transformStorageLocationResponse,
  transformStorageRoomsResponse,
  transformTotalQuantityResponse,
} from "./utils";

export const storageApi = createApi({
  reducerPath: "storageApi",
  baseQuery: fetchQuery,
  tagTypes: ["StorageRooms"],
  endpoints: (builder) => ({
    getStorageRooms: builder.query<StorageRoomsBrief[], void>({
      query: () => "/storage",
      transformResponse: (response: BackendStorageRoomsBrief[]) => response.map(transformStorageRoomsResponse),
      providesTags: ["StorageRooms"],
    }),

    getStorageLocationDetail: builder.query<RoomData, string>({
      query: (locationId) => `/storage/${locationId}`,
      transformResponse: (response: BackendRoomData) => transformStorageLocationResponse(response),
      providesTags: ["StorageRooms"],
    }),

    createRoom: builder.mutation<void, NewStorageRoom>({
      query: ({ room, description }) => ({
        url: "/storage",
        method: "POST",
        body: {
          room,
          description,
        },
      }),
      invalidatesTags: ["StorageRooms"],
    }),

    updateStorageRoom: builder.mutation<void, UpdateStorageRoom>({
      query: ({ id, room, description }) => ({
        url: `/storage/${id}`,
        method: "PUT",
        body: {
          room,
          description,
        },
      }),
      invalidatesTags: ["StorageRooms"],
    }),

    createStorageRoom: builder.mutation<void, NewRoom>({
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

    getSubstanceTotalQuantity: builder.query<Array<SubstancesTotalQuantity>, void>({
      query: () => "/storage/total",
      transformResponse: (baseQueryReturnValue: Array<SubstancesTotalQuantityResponse>) => {
        return transformTotalQuantityResponse(baseQueryReturnValue);
      },
    }),

    deleteStorageLocation: builder.mutation<void, number>({
      query: (locationId) => ({
        url: `/storage/location/${locationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StorageRooms"],
    }),

    moveSubstance: builder.mutation<void, MoveSubstance>({
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
  useCreateRoomMutation,
  useUpdateStorageRoomMutation,
  useCreateStorageRoomMutation,
  useDeleteStorageLocationMutation,
  useMoveSubstanceMutation,
  useGetSubstanceTotalQuantityQuery,
} = storageApi;
