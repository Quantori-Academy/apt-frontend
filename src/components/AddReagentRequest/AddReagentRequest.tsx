import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BasicModal, ReagentRequestForm } from "@/components";
import { useReagentRequestForm } from "@/components/ReagentRequestForm";
import { useAddReagentRequestMutation } from "@/store";

type ReagentRequestInput = {
  reagentName: string;
  CAS: string;
  desiredQuantity: number | null;
  userComment: string;
  unit: string;
};

type AddReagentRequestProps = {
  modalOpen: boolean;
  onClose: () => void;
  onAddRequestForm: (severity: "error" | "success") => void;
};

const AddReagentRequest: React.FC<AddReagentRequestProps> = ({
  modalOpen,
  onClose,
  onAddRequestForm,
}) => {
  const { t } = useTranslation();

  const formMethods = useReagentRequestForm();

  const [addReagentRequest, { isLoading }] = useAddReagentRequestMutation();

  const onSubmit = async (newReagentRequest: ReagentRequestInput) => {
    const { error } = await addReagentRequest(newReagentRequest);

    if (error) {
      onAddRequestForm("error");
    } else {
      formMethods.reset();
      onClose();
      onAddRequestForm("success");
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
          onSubmit={onSubmit}
          isLoading={isLoading}
          onClose={onClose}
        />
      </FormProvider>
    </BasicModal>
  );
};

export default AddReagentRequest;
