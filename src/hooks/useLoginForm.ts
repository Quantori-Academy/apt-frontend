import { ChangeEvent, FormEvent, useState } from "react";

import { loginUser } from "@/store/slices/authSlice";
import { UserInputData } from "@/types";
import { UserInputErrors } from "@/types";

import { useAppDispatch } from "./useAppDispatch";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<UserInputData>({
    username: "",
    password: "",
  });

  const [requiredErrors, setRequiredErrors] = useState<UserInputErrors>({
    requiredUsernameError: false,
    requiredPasswordError: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequiredErrors({
      requiredUsernameError: false,
      requiredPasswordError: false,
    });
    let hasError = false;
    if (!userData.username) {
      setRequiredErrors((prev) => ({ ...prev, requiredUsernameError: true }));
      hasError = true;
    }
    if (!userData.password) {
      setRequiredErrors((prev) => ({ ...prev, requiredPasswordError: true }));
      hasError = true;
    }
    if (hasError) {
      return;
    }
    console.log(userData);
    dispatch(loginUser(userData));
  };

  return { userData, requiredErrors, handleChange, handleSubmit };
};
