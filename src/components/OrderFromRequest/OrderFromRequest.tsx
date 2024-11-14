import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { OrderForm } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import { useCreateOrderFromRequestsMutation } from "@/store";
import { OrderInput, ReagentRequests } from "@/types";

type AddOrderProps = {
  modalOpen: boolean;
  onClose: () => void;
  requests: ReagentRequests;
  onCreateOrder: () => void;
};

const OrderFromRequest: React.FC<AddOrderProps> = ({
  modalOpen,
  onClose,
  requests,
  onCreateOrder,
}) => {
  const { t } = useTranslation();

  const { showSuccess, showError } = useAlertSnackbar();

  const initialValues: OrderInput = {
    title: "",
    seller: "",
    reagents: requests.map((request) => {
      const [reagentQuantity, reagentUnit] = request.desiredQuantity.split(" ");
      return {
        reagentName: request.name || "",
        unit: reagentUnit || "",
        quantity: reagentQuantity || "",
        pricePerUnit: "",
        structure: request.structure || "",
        CASNumber: request.CAS || "",
        producer: "",
        catalogId: "",
        catalogLink: "",
      };
    }),
  };

  const [createOrderFromRequests, { isLoading }] =
    useCreateOrderFromRequestsMutation();

  const onSubmit: SubmitHandler<OrderInput> = async (data) => {
    try {
      await createOrderFromRequests({
        requestId: requests[0].id,
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
      onClose={onClose}
      initialValues={initialValues}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default OrderFromRequest;
