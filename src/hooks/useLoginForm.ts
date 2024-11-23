import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { RouteProtectedPath } from "@/router";
import { useLoginMutation } from "@/store";
import { UserLoginInput } from "@/types";

export const useLoginForm = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: requiredErrors },
  } = useForm<UserLoginInput>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UserLoginInput> = async (userData: UserLoginInput) => {
    const { error } = await login(userData);

    if (!error) {
      navigate(RouteProtectedPath.dashboard);
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), requiredErrors };
};
