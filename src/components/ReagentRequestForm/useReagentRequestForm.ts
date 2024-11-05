import { useForm } from "react-hook-form";

import { ReagentRequestInput } from "./ReagentRequestForm";

function useReagentRequestForm() {
  return useForm<ReagentRequestInput>({
    defaultValues: {
      reagentName: "",
      CAS: "",
      desiredQuantity: null,
      userComment: "",
      unit: "",
    },
  });
}

export default useReagentRequestForm;
