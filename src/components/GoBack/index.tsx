import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const GoBack = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={handleGoBack}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        mb: 2,
        py: 0.5,
        px: 1.5,
        borderColor: "palevioletred",
        color: "palevioletred",
      }}
    >
      <ArrowBackIcon fontSize="small" />
      Back
    </Button>
  );
};
