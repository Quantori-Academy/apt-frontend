import { Button } from "@mui/material";

type SaveCancelButtons = {
  saveText: string;
  cancelText: string;
  onClickCancel: () => void;
};

const SaveCancelButtons: React.FC<SaveCancelButtons> = ({
  saveText,
  cancelText,
  onClickCancel,
}) => {
  return (
    <>
      <Button type="submit">{saveText}</Button>
      <Button type="button" onClick={onClickCancel}>
        {cancelText}
      </Button>
    </>
  );
};

export default SaveCancelButtons;
