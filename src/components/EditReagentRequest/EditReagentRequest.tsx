import { FormProvider } from "react-hook-form";

import { BasicModal, ReagentRequestForm } from "@/components";
import { useReagentRequestForm } from "@/components/ReagentRequestForm";
import { Severity } from "@/hooks";
import { useEditReagentRequestMutation } from "@/store";
import { ReagentRequestInput, RequestedReagent } from "@/types";

type ReagentRequestDetailsProps = {
  requestId: string;
  modalOpen: boolean;
  request: RequestedReagent;
  onClose: () => void;
  onEditSubmit: (severity: Severity, errorMessage: string) => void;
};

const EditReagentRequest: React.FC<ReagentRequestDetailsProps> = ({
  requestId,
  modalOpen,
  request,
  onClose,
  onEditSubmit,
}) => {
  const [desiredQuantity, unit] = request.quantity.split(" ");

  const formMethods = useReagentRequestForm({
    reagentName: request?.name,
    CAS: request?.CAS,
    desiredQuantity: Number(desiredQuantity),
    userComment: request?.userComment,
    unit: unit,
  });

  const [editReagentRequest] = useEditReagentRequestMutation();

  const onSubmit = async (editedRequest: ReagentRequestInput) => {
    const { error } = await editReagentRequest({
      requestId,
      editedRequest,
    });

    if (error) {
      onEditSubmit("error", "Failed to Update Request");
    } else {
      onClose();
      onEditSubmit("success", "Request Successfully Updated");
    }
  };

  return (
    <BasicModal
      title="Reagent Request Detail"
      isOpen={modalOpen}
      closeModal={onClose}
    >
      <FormProvider {...formMethods}>
        <ReagentRequestForm
          isEdit={true}
          isLoading={false}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </FormProvider>
    </BasicModal>
  );
};

export default EditReagentRequest;
