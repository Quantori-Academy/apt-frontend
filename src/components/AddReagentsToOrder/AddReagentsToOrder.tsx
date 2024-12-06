import { useTranslation } from "react-i18next";

import { OrderForm } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useAddReagentsToOrderMutation } from "@/store";
import { OrderInput } from "@/types";
import { handleError } from "@/utils";

type AddReagentsToOrderProps = {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
};

const AddReagentsToOrder: React.FC<AddReagentsToOrderProps> = ({
  isOpen,
  orderId,
  onClose,
}) => {
  const { t } = useTranslation();

  const [addReagentsToOrder, { isLoading }] = useAddReagentsToOrderMutation();

  const { showSuccess, showError } = useAlertSnackbar();

  const initialValues: OrderInput = {
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

  const onSubmit = async (data: OrderInput) => {
    try {
      await addReagentsToOrder({
        orderId,
        ...data,
      }).unwrap();
      showSuccess(t("createOrderForm.snackBarMessages.addingReagents.success"));
      onClose();
    } catch (error) {
      handleError({ error, t, showError });
    }
  };

  return (
    <OrderForm
      modalOpen={isOpen}
      initialValues={initialValues}
      orderCreation={false}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default AddReagentsToOrder;
