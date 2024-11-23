import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, prepareHeaders } from "@/api";
import { RoutePublicPath } from "@/router";
import { Token } from "@/types";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders,
});

export const fetchQuery: typeof baseQuery = async (...args) => {
  const result = await baseQuery(...args);

  if (result.error?.status === 403) {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
        headers: prepareHeaders(new Headers()),
      });

      if (response.ok) {
        const { token, refresh_token } = (await response.json()) as Token;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refresh_token);

        return baseQuery(...args);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = RoutePublicPath.login;
      }
    } catch {
      return result;
    }
  }

  return result;
};
