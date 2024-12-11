import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RouteProtectedPath } from "@/router";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: `calc(100vh - 140px)`,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "108px",
          fontWeight: "bold",
        }}
      >
        <Typography fontSize="inherit" component="span">
          4
        </Typography>
        <ScienceRoundedIcon sx={{ fontSize: "inherit" }} />
        <Typography fontSize="inherit" component="span">
          4
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ pb: 4 }}>
        {t("notFoundPage.title")}
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(RouteProtectedPath.dashboard)}
      >
        {t("notFoundPage.button")}
      </Button>
    </Container>
  );
};

export default NotFoundPage;
