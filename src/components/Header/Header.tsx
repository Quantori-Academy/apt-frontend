import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { AppBar, Box, Button, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { RoutePublicPath } from "@/router/publicRoutesRouterConfig.tsx";
import { selectUserIsAuthenticated } from "@/store";
import { selectUsername } from "@/store/slices";

import { LanguageSwitcher } from "../LanguageSwitcher";
import { Logo } from "../Logo";

type HeaderProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void | null;
};
const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = async (value: string) => {
    setCurrentLanguage(value);
    await changeLanguage(value);
  };

  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);
  const username = useAppSelector(selectUsername);
  const displayLanguageValue = currentLanguage === "ENG" ? "ENG" : "РУС";

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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            margin={3}
            textAlign="center"
          >
            <IconButton
              color="inherit"
              sx={{ padding: 0 }}
              onClick={(e) => onClick(e)}
            >
              <PermIdentityIcon
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid white",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              />
            </IconButton>
            <Typography textAlign="center">{username}</Typography>
          </Box>
        ) : (
          <Button component={NavLink} to={RoutePublicPath.login}>
            {t("buttons.login")}
          </Button>
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
