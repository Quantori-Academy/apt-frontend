export const BASE_URL = import.meta.env.VITE_APP_API_URL as string;
console.log(BASE_URL);
export function prepareHeaders(headers: Headers) {
  const token = localStorage.getItem("accessToken");

  if (!headers.get("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

const getHeaders = (customHeaders?: HeadersInit) => {
  const headers = new Headers(customHeaders);
  return prepareHeaders(headers);
};

class ApiMethods {
  constructor(private baseUrl: string) {}

  private async apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
    const fullUrl = this.baseUrl + url;
    const headers = getHeaders(options?.headers);

    try {
      const response = await fetch(fullUrl, { ...options, headers });

      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    } catch (error) {
      console.error("API request failed", error);
      throw error;
    }
  }

  public get<T>(url: string, options?: RequestInit) {
    return this.apiRequest<T>(url, { ...options, method: "GET" });
  }

  public post<T>(url: string, options?: RequestInit) {
    return this.apiRequest<T>(url, { ...options, method: "POST" });
  }

  public put<T>(url: string, options?: RequestInit) {
    return this.apiRequest<T>(url, { ...options, method: "PUT" });
  }

  public delete<T>(url: string, options?: RequestInit) {
    return this.apiRequest<T>(url, { ...options, method: "DELETE" });
  }
}

export const apiMethods = new ApiMethods(BASE_URL);
