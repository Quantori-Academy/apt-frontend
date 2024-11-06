import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type OrderAccordionButtonsProps = {
  isEditable: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

const OrderAccordionButtons: React.FC<OrderAccordionButtonsProps> = ({
  isEditable,
  onEdit,
  onCancel,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {isEditable ? (
        <>
          <Button key="save" type="submit">
            {t("buttons.save")}
          </Button>
          <Button key="cancel" type="button" onClick={onCancel}>
            {t("buttons.cancel")}
          </Button>
        </>
      ) : (
        <>
          <Button key="edit" type="button" onClick={onEdit}>
            {t("buttons.edit")}
          </Button>
          <Button key="delete" type="button" onClick={onDelete}>
            {t("buttons.delete")}
          </Button>
        </>
      )}
    </>
  );
};

export default OrderAccordionButtons;
