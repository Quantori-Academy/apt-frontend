export const EndPoints = {
  API_STATUS: "/status",
  LOGIN: "/login",
  STORAGE_LOCATIONS: "/storage-locations",
  STORAGE_LOCATION_BY_ID: (id: number) => `/storage-locations/${id}`,
};
