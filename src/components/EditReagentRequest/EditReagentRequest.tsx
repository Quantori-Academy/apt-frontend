import { FormProvider } from "react-hook-form";

import { BasicModal, ReagentRequestForm } from "@/components";
import { useReagentRequestForm } from "@/components/ReagentRequestForm";
import { Severity } from "@/hooks";
import { useEditReagentRequestMutation } from "@/store";
import { ReagentRequestInput, RequestedReagent } from "@/types";

type ReagentRequestDetailsProps = {
  onClose: () => void;
  modalOpen: boolean;
  request: RequestedReagent;
  requestId: string;
  onEditSubmit: (severity: Severity, errorMessage: string) => void;
};

const EditReagentRequest: React.FC<ReagentRequestDetailsProps> = ({
  onClose,
  modalOpen,
  request,
  requestId,
  onEditSubmit,
}) => {
  const [desiredQuantity, unit] = request.desiredQuantity.split(" ");

  const formMethods = useReagentRequestForm({
    reagentName: request?.name,
    CAS: request?.CAS,
    desiredQuantity: Number(desiredQuantity),
    userComment: request?.userComment,
    unit: unit,
  });

  const [editReagentRequest] = useEditReagentRequestMutation();

  const onSubmit = async (editedRequest: ReagentRequestInput) => {
    console.log("am:", editedRequest.userComment);
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
      isOpen={modalOpen}
      closeModal={onClose}
      title="Reagent Request Detail"
    >
      <FormProvider {...formMethods}>
        <ReagentRequestForm
          isEdit={true}
          onSubmit={onSubmit}
          isLoading={false}
          onClose={onClose}
        />
      </FormProvider>
    </BasicModal>
  );
};

export default EditReagentRequest;
