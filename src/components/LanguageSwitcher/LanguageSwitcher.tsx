import LanguageIcon from "@mui/icons-material/Language";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CustomMenu } from "@/components";
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
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Slight transparency for contrast
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "6px",
          padding: "6px 12px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Brighter hover effect
            borderColor: "rgba(255, 255, 255, 0.6)",
          },
        }}
      >
        <LanguageIcon fontSize="small" sx={{ marginRight: 1 }} />
        <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
          {language}
        </Typography>
      </IconButton>

      <CustomMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={() => setAnchorEl(null)}
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
      </CustomMenu>
    </Box>
  );
};

export default LanguageSwitcher;
