import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { RoutePublicPath } from "@/router/publicRoutesRouterConfig";

const NavigationUnauth: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Button component={NavLink} to={RoutePublicPath.login}>
      {t("header.button.login")}
    </Button>
  );
};

export default NavigationUnauth;
