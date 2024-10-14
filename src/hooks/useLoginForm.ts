import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { loginUser } from "@/store/slices/authSlice";
import { UserLoginInput } from "@/types";

import { useAppDispatch } from "./useAppDispatch";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: requiredErrors },
  } = useForm<UserLoginInput>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UserLoginInput> = async (userData: UserLoginInput) => {
    const result = await dispatch(loginUser(userData));

    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), requiredErrors };
};
