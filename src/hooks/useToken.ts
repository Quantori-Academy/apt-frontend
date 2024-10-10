import { useEffect } from "react";

import { setUser } from "@/store/slices/authSlice";

import { useAppDispatch } from "./useAppDispatch";

export const useToken = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setUser({ token }));
    }
  }, [dispatch]);
};
