import { ApiStatus, Tokens } from "@/types";
import { UserInputData } from "@/types";
import { StorageRoomsBrief } from "@/types";

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
    return apiMethods.get<StorageRoomsBrief[]>(EndPoints.STORAGE_LOCATIONS, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public addStorageLocation(data: { room: string }) {
    const token = localStorage.getItem("authToken");
    return apiMethods.post<StorageRoomsBrief>(EndPoints.STORAGE_LOCATIONS, {
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

  public editStorageLocation(id: number, roomName: string) {
    const token = localStorage.getItem("authToken");
    return apiMethods.put<StorageRoomsBrief>(`${EndPoints.STORAGE_LOCATIONS}/${id}/${roomName}`, {
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
