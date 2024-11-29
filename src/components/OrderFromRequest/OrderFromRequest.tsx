import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { OrderForm } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useCreateOrderFromRequestsMutation } from "@/store";
import { OrderInput, ReagentRequests } from "@/types";

type AddOrderProps = {
  modalOpen: boolean;
  requests: ReagentRequests;
  onClose: () => void;
  onCreateOrder: () => void;
};

const OrderFromRequest: React.FC<AddOrderProps> = ({
  modalOpen,
  requests,
  onClose,
  onCreateOrder,
}) => {
  const { t } = useTranslation();

  const { showSuccess, showError } = useAlertSnackbar();

  const initialValues: OrderInput = {
    title: "",
    seller: "",
    reagents: requests.map((request) => {
      const [reagentQuantity, reagentUnit] = request.quantity.split(" ");
      return {
        reagentName: request.name || "",
        unit: reagentUnit || "",
        quantity: reagentQuantity || "",
        pricePerUnit: "",
        amount: String(request.amount),
        structure: request.structure || "",
        CASNumber: request.CAS || "",
        producer: "",
        catalogId: "",
        catalogLink: "",
        fromRequest: true,
      };
    }),
  };

  const [createOrderFromRequests, { isLoading }] =
    useCreateOrderFromRequestsMutation();

  const onSubmit: SubmitHandler<OrderInput> = async (data) => {
    try {
      await createOrderFromRequests({
        requestIds: requests.map((request) => request.id),
        ...data,
      }).unwrap();
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
    } finally {
      onCreateOrder();
    }
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

export default OrderFromRequest;
