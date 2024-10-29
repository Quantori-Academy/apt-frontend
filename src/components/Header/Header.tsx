import { AppBar, Container, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/hooks";
import { selectUserIsAuthenticated } from "@/store";

import { LanguageSwitcher } from "../LanguageSwitcher";
import { NavigationAuth } from "../NavigationAuth";
import { NavigationUnauth } from "../NavigationUnauth";

const Header: React.FC = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = async (value: string) => {
    setCurrentLanguage(value);
    await changeLanguage(value);
  };

  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  const displayLanguageValue = currentLanguage === "ENG" ? "ENG" : "РУС";

  return (
    <AppBar position="sticky" color="inherit" sx={{ height: "75px" }}>
      <Container sx={{ height: "100%" }}>
        <Toolbar
          sx={{
            height: "100%",
            justifyContent: isAuthenticated ? "" : "flex-end",
            alignItems: "center",
            gap: 2,
          }}
          variant="dense"
        >
          {isAuthenticated ? <NavigationAuth /> : <NavigationUnauth />}
          <LanguageSwitcher
            handleChangeLanguage={handleChangeLanguage}
            language={displayLanguageValue}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
