import { useForm } from "react-hook-form";

import { ReagentRequestInput } from "@/types";

function useReagentRequestForm(defaultValues: ReagentRequestInput) {
  return useForm<ReagentRequestInput>({
    values: defaultValues,
  });
}

export default useReagentRequestForm;
