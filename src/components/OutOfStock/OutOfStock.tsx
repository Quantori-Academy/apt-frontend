import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const OutOfStock = () => {
  const { t } = useTranslation();

  return (
    <Typography
      sx={{
        mb: 3,
        fontSize: "36px",
        textAlign: "center",
        color: "#eb8d8d",
      }}
    >
      {t("substanceDetails.outOfStock")}
    </Typography>
  );
};

export default OutOfStock;
