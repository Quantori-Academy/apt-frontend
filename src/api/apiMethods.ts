export const BASE_URL = import.meta.env.VITE_APP_API_URL as string;
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
