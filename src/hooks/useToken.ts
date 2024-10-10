import { useEffect } from "react";

import { setUser } from "@/store/slices/authSlice";

import { useAppDispatch } from "./useAppDispatch";

export const useToken = () => {
  const dispatch = useAppDispatch();
  console.log("worked useToken");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log("worked if inside useToken");
      dispatch(setUser({ token }));
    }
  }, [dispatch]);
};
