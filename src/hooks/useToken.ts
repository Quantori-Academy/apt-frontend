import { useEffect, useState } from "react";

import { setUser } from "@/store/slices/authSlice";

import { useAppDispatch } from "./useAppDispatch";

export const useToken = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setUser({ token }));
    }
    setIsLoading(false);
  }, [dispatch]);
  return isLoading;
};
