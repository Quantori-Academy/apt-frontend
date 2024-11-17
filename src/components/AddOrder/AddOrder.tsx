import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { OrderForm } from "@/components";
import { Severity } from "@/hooks";
import { useCreateOrderMutation } from "@/store";
import { OrderInput } from "@/types";

type AddOrderProps = {
  modalOpen: boolean;
  onClose: () => void;
  openSnackbar: (severity: Severity, text: string) => void;
};

const AddOrder: React.FC<AddOrderProps> = ({
  modalOpen,
  onClose,
  openSnackbar,
}) => {
  const { t } = useTranslation();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const onSubmit: SubmitHandler<OrderInput> = async (data) => {
    try {
      await createOrder(data).unwrap();
      openSnackbar(
        "success",
        t("createOrderForm.snackBarMessages.creation.success")
      );
      onClose();
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorMessage = (err as { data: { message: string } }).data
          .message;
        openSnackbar("error", errorMessage);
      } else {
        openSnackbar(
          "error",
          t("substanceDetails.snackBarMessages.unexpectedError")
        );
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
