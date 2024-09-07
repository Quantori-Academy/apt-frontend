import { ApiStatus } from "@/types";

import { apiMethods } from "./apiMethods";
import { EndPoints } from "./endPoints";

class ApiManager {
  public getApiStatus() {
    return apiMethods.get<ApiStatus>(EndPoints.API_STATUS);
  }
}

export const apiManager = new ApiManager();
