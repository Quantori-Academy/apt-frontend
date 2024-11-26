import { Delete, ModeEditOutlineOutlined, Save } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

type OrderReagentButtonsProps = {
  isEditable: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

const OrderReagentButtons: React.FC<OrderReagentButtonsProps> = ({
  isEditable,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {isEditable ? (
        <Stack direction="row" spacing={2}>
          <IconButton onClick={onSave}>
            <Save />
          </IconButton>
          <Button key="cancel" type="button" onClick={onCancel}>
            {t("buttons.cancel")}
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1} justifyContent="center">
          <IconButton key="edit" type="button" onClick={onEdit}>
            <ModeEditOutlineOutlined />
          </IconButton>
          <IconButton onClick={onDelete}>
            <Delete />
          </IconButton>
        </Stack>
      )}
    </>
  );
};

export default OrderReagentButtons;
