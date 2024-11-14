import { useTranslation } from "react-i18next";

import { OrderForm } from "@/components";
import { Severity } from "@/hooks";
import { useAddReagentsToOrderMutation } from "@/store";
import { OrderInput } from "@/types";

type AddReagentsToOrderProps = {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
  openSnackbar: (severity: Severity, text: string) => void;
};

const AddReagentsToOrder: React.FC<AddReagentsToOrderProps> = ({
  isOpen,
  orderId,
  onClose,
  openSnackbar,
}) => {
  const { t } = useTranslation();

  const [addReagentsToOrder, { isLoading }] = useAddReagentsToOrderMutation();

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
      openSnackbar(
        "error",
        t("createOrderForm.snackBarMessages.addingReagents.error")
      );
    } else {
      openSnackbar(
        "success",
        t("createOrderForm.snackBarMessages.addingReagents.success")
      );
      onClose();
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
