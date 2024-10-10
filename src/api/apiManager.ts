import { ApiStatus, Tokens } from "@/types";
import { UserInputData } from "@/types";
import { StorageLocation } from "@/types";

import { apiMethods } from "./apiMethods";
import { EndPoints } from "./endPoints";

class ApiManager {
  public getApiStatus() {
    return apiMethods.get<ApiStatus>(EndPoints.API_STATUS);
  }
  public login(credentials: UserInputData) {
    return apiMethods.post<Tokens>(EndPoints.LOGIN, {
      body: JSON.stringify(credentials),
    });
  }
  public getStorageLocations() {
    const token = localStorage.getItem("authToken");
    return apiMethods.get<StorageLocation[]>(EndPoints.STORAGE_LOCATIONS, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public addStorageLocation(data: { room: string; name: string }) {
    const token = localStorage.getItem("authToken");
    return apiMethods.post<StorageLocation>(EndPoints.STORAGE_LOCATIONS, {
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

  public editStorageLocation(id: number, data: { room: string; name: string }) {
    const token = localStorage.getItem("authToken");
    return apiMethods.put<StorageLocation>(`${EndPoints.STORAGE_LOCATIONS}/${id}`, {
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

  public deleteStorageLocation(id: number) {
    const token = localStorage.getItem("authToken");
    return apiMethods.delete(`${EndPoints.STORAGE_LOCATIONS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const apiManager = new ApiManager();
