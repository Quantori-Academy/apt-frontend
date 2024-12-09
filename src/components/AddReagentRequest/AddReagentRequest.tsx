import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BasicModal, ReagentRequestForm } from "@/components";
import { useReagentRequestForm } from "@/components/ReagentRequestForm";
import { Severity } from "@/hooks";
import { useAddReagentRequestMutation } from "@/store";
import { ReagentRequestInput } from "@/types";
import { isFetchBaseQueryError } from "@/utils";

type AddReagentRequestProps = {
  modalOpen: boolean;
  onClose: () => void;
  onAddRequestForm: (severity: Severity, errorMessage?: string) => void;
};

const AddReagentRequest: React.FC<AddReagentRequestProps> = ({
  modalOpen,
  onClose,
  onAddRequestForm,
}) => {
  const { t } = useTranslation();

  const formMethods = useReagentRequestForm({
    reagentName: "",
    CAS: "",
    initialQuantity: 0,
    userComment: "",
    unit: "",
    structure: "",
    amount: 0,
  });

  const [addReagentRequest, { isLoading }] = useAddReagentRequestMutation();

  const onSubmit = async (newReagentRequest: ReagentRequestInput) => {
    try {
      await addReagentRequest(newReagentRequest).unwrap();
      formMethods.reset();
      onAddRequestForm("success");
      onClose();
    } catch (error) {
      if (isFetchBaseQueryError(error) && error.data) {
        onAddRequestForm("error", error.data as string);
      }
    }
  };

  return (
    <BasicModal
      title={t("createRequestForm.title")}
      closeModal={onClose}
      isOpen={modalOpen}
    >
      <FormProvider {...formMethods}>
        <ReagentRequestForm
          isEdit={false}
          onSubmit={onSubmit}
          isLoading={isLoading}
          onClose={onClose}
        />
      </FormProvider>
    </BasicModal>
  );
};

export default AddReagentRequest;
