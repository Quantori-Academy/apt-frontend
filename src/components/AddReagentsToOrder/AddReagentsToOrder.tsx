import { useTranslation } from "react-i18next";

import { OrderForm } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useAddReagentsToOrderMutation } from "@/store";
import { OrderInput } from "@/types";

type AddReagentsToOrderProps = {
  onClose: () => void;
  isOpen: boolean;
  orderId: string;
};

const AddReagentsToOrder: React.FC<AddReagentsToOrderProps> = ({
  onClose,
  isOpen,
  orderId,
}) => {
  const { t } = useTranslation();

  const [addReagentsToOrder, { isLoading }] = useAddReagentsToOrderMutation();

  const { showSuccess, showError } = useAlertSnackbar();

  const initialValues: OrderInput = {
    reagents: [
      {
        reagentName: "",
        unit: "",
        quantity: "",
        pricePerUnit: "",
        structure: "",
        CASNumber: "",
        producer: "",
        catalogId: "",
        catalogLink: "",
      },
    ],
  };

  const onSubmit = async (data: OrderInput) => {
    const { error } = await addReagentsToOrder({
      orderId,
      ...data,
    });
    if (error) {
      showError(t("createOrderForm.snackBarMessages.addingReagents.error"));
    } else {
      showSuccess(t("createOrderForm.snackBarMessages.addingReagents.success"));
      onClose();
    }
  };

  return (
    <OrderForm
      modalOpen={isOpen}
      onClose={onClose}
      initialValues={initialValues}
      orderCreation={false}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default AddReagentsToOrder;
