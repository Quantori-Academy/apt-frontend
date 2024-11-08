import { Button } from "@mui/material";

type SaveCancelButtons = {
  saveText: string;
  saveDisabled?: boolean;
  cancelText: string;
  onClickCancel: () => void;
  onClickSave?: () => void;
};

const SaveCancelButtons: React.FC<SaveCancelButtons> = ({
  saveText,
  saveDisabled = false,
  cancelText,
  onClickCancel,
  onClickSave,
}) => {
  return (
    <>
      <Button
        disabled={saveDisabled}
        type={onClickSave ? "button" : "submit"}
        onClick={onClickSave}
      >
        {saveText}
      </Button>
      <Button type="button" onClick={onClickCancel}>
        {cancelText}
      </Button>
    </>
  );
};

export default SaveCancelButtons;
