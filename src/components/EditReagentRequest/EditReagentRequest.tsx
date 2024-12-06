import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BasicModal, ReagentRequestForm } from "@/components";
import { useReagentRequestForm } from "@/components/ReagentRequestForm";
import { Severity } from "@/hooks";
import { useEditReagentRequestMutation } from "@/store";
import { ReagentRequestInput, RequestedReagent } from "@/types";
import { isFetchBaseQueryError } from "@/utils";

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
  const { t } = useTranslation();

  const [desiredQuantity, unit] = request.quantity.split(" ");

  const formMethods = useReagentRequestForm({
    reagentName: request?.name,
    CAS: request?.CAS,
    initialQuantity: Number(desiredQuantity),
    userComment: request?.userComment,
    unit: unit,
    amount: request?.amount,
    structure: request?.structure,
  });

  const [editReagentRequest] = useEditReagentRequestMutation();

  const onSubmit = async (editedRequest: ReagentRequestInput) => {
    try {
      await editReagentRequest({
        requestId,
        editedRequest,
      }).unwrap();

      onEditSubmit("success", t("requests.successUpdate"));
      onClose();
    } catch (error) {
      if (isFetchBaseQueryError(error) && error.data) {
        onEditSubmit("error", t(`backendErrors.${error.data}`));
      }
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
