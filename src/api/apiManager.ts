import { ApiStatus, Token, UserInputData } from "@/types";

import { apiMethods } from "./apiMethods";
import { EndPoints } from "./endPoints";

class ApiManager {
  public getApiStatus() {
    return apiMethods.get<ApiStatus>(EndPoints.API_STATUS);
  }
  public login(credentials: UserInputData) {
    return apiMethods.post<Token>(EndPoints.LOGIN, {
      body: JSON.stringify(credentials),
    });
  }
}

export const apiManager = new ApiManager();
