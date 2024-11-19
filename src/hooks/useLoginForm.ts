import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import { loginUser } from "@/store";
import { UserLoginInput } from "@/types";

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
      navigate(RouteProtectedPath.dashboard);
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), requiredErrors };
};
