import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { OrderForm } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useCreateOrderMutation } from "@/store";
import { OrderInput } from "@/types";

type AddOrderProps = {
  modalOpen: boolean;
  onClose: () => void;
};

const AddOrder: React.FC<AddOrderProps> = ({ modalOpen, onClose }) => {
  const { t } = useTranslation();

  const { showSuccess, showError } = useAlertSnackbar();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const onSubmit: SubmitHandler<OrderInput> = async (data) => {
    try {
      await createOrder(data).unwrap();
      showSuccess(t("createOrderForm.snackBarMessages.creation.success"));
      onClose();
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        showError(errorMessage);
      } else {
        showError(t("substanceDetails.snackBarMessages.unexpectedError"));
      }
    }
  };

  const initialValues: OrderInput = {
    title: "",
    seller: "",
    reagents: [
      {
        reagentName: "",
        unit: "",
        amount: "",
        quantity: "",
        pricePerUnit: "",
        structure: "",
        CASNumber: "",
        producer: "",
        catalogId: "",
        catalogLink: "",
        fromRequest: false,
      },
    ],
  };

  return (
    <OrderForm
      modalOpen={modalOpen}
      initialValues={initialValues}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default AddOrder;
