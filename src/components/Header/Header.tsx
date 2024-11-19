import { AppBar, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import { AuthUserInfo, LanguageSwitcher, Logo } from "@/components";
import { useAppSelector } from "@/hooks";
import { RoutePublicPath } from "@/router";
import { selectUserIsAuthenticated } from "@/store";

const Header: React.FC = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("appLanguage") || language;
  });

  const handleChangeLanguage = async (value: string) => {
    setCurrentLanguage(value);
    await changeLanguage(value);
    localStorage.setItem("appLanguage", value);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      changeLanguage(savedLanguage);
    }
  }, [changeLanguage]);

  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  const displayLanguageValue = currentLanguage === "ENG" ? "ENG" : "РУС";

  const location = useLocation();
  const path = location.pathname;

  return (
    <AppBar
      position="fixed"
      elevation={3}
      color="primary"
      sx={{
        zIndex: 2,
        paddingX: "24px",
        paddingY: "12px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "5px",
        alignItems: "center",
        height: "70px",
      }}
    >
      <Logo />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isAuthenticated ? (
          <AuthUserInfo />
        ) : (
          path !== "/login" && (
            <Button component={NavLink} to={RoutePublicPath.login}>
              {t("buttons.login")}
            </Button>
          )
        )}
        <LanguageSwitcher
          handleChangeLanguage={handleChangeLanguage}
          language={displayLanguageValue}
        />
      </Box>
    </AppBar>
  );
};

export default Header;
