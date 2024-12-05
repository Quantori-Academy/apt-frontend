import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { SubstancesCategory } from "@/types";

type DisposeButtonProps = {
  substanceType: SubstancesCategory;
  onClickDispose: () => void;
};

const DisposeButton: React.FC<DisposeButtonProps> = ({
  substanceType,
  onClickDispose,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      sx={{
        mb: 3,
        borderColor: "red",
        "&:hover": {
          background: "#FF4D4D75",
        },
      }}
      onClick={onClickDispose}
      variant="outlined"
      color="error"
    >
      {t(`substanceDetails.buttons.dispose${substanceType}`)}
    </Button>
  );
};

export default DisposeButton;
