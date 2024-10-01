import { ApiStatus, Tokens } from "@/types";

import { apiMethods } from "./apiMethods";
import { EndPoints } from "./endPoints";

class ApiManager {
  public getApiStatus() {
    return apiMethods.get<ApiStatus>(EndPoints.API_STATUS);
  }
  public login(credentials: { username: string; password: string }) {
    return apiMethods.post<Tokens>(EndPoints.LOGIN, {
      body: JSON.stringify(credentials),
    });
  }
}

export const apiManager = new ApiManager();
