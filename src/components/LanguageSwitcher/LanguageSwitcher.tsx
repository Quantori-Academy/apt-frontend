import LanguageIcon from "@mui/icons-material/Language";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { LanguageKey, LanguageValue } from "@/constants";

type LanguageSwitcherProps = {
  language: LanguageValue;
  handleChangeLanguage: (value: LanguageKey) => void;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  language,
  handleChangeLanguage,
}) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = (value: LanguageKey) => {
    handleChangeLanguage(value);
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "transparent",
            color: "black",
          },
        }}
      >
        <LanguageIcon fontSize="small" style={{ marginRight: 5 }} />
        {language}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem sx={{ paddingX: "40px" }} onClick={() => handleClose("ENG")}>
          {t("languages.ENG")}
        </MenuItem>
        <MenuItem sx={{ paddingX: "40px" }} onClick={() => handleClose("RUS")}>
          {t("languages.RUS")}
        </MenuItem>
        <MenuItem sx={{ paddingX: "40px" }} onClick={() => handleClose("KA")}>
          {t("languages.KA")}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
