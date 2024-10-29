import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate("/")}>
      <Typography variant="h4" color="white" fontWeight={800}>
        LIMS
      </Typography>
    </IconButton>
  );
};

export default Logo;
