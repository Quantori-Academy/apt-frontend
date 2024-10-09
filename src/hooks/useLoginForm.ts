import { SubmitHandler, useForm } from "react-hook-form";

import { loginUser } from "@/store/slices/authSlice";
import { UserLoginInput } from "@/types";

import { useAppDispatch } from "./useAppDispatch";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors: requiredErrors },
  } = useForm<UserLoginInput>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<UserLoginInput> = (userData: UserLoginInput) => {
    dispatch(loginUser(userData));
  };

  return { register, handleSubmit: handleSubmit(onSubmit), requiredErrors };
};
