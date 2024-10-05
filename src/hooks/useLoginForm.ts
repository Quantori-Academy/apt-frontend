import { SubmitHandler, useForm } from "react-hook-form";

import { loginUser } from "@/store/slices/authSlice";
import { UserInputData } from "@/types";

import { useAppDispatch } from "./useAppDispatch";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors: requiredErrors },
  } = useForm<UserInputData>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<UserInputData> = (userData: UserInputData) => {
    console.log(userData);
    dispatch(loginUser(userData));
  };

  return { register, onSubmit, handleSubmit, requiredErrors };
};
