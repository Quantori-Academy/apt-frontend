import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type SaveCancelButtons = {
  saveDisabled?: boolean;
  onClickCancel: () => void;
  onClickSave?: () => void;
};

const SaveCancelButtons: React.FC<SaveCancelButtons> = ({
  saveDisabled = false,
  onClickCancel,
  onClickSave,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      <Button
        disabled={saveDisabled}
        type={onClickSave ? "button" : "submit"}
        onClick={onClickSave}
      >
        {t("buttons.save")}
      </Button>
      <Button type="button" onClick={onClickCancel}>
        {t("buttons.cancel")}
      </Button>
    </Box>
  );
};

export default SaveCancelButtons;
