import LanguageIcon from "@mui/icons-material/Language";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

type LanguageSwitcherProps = {
  handleChangeLanguage: (value: string) => void;
  language: string;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  language,
  handleChangeLanguage,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = (value: string) => {
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem sx={{ paddingX: "40px" }} onClick={() => handleClose("ENG")}>
          English
        </MenuItem>
        <MenuItem sx={{ paddingX: "40px" }} onClick={() => handleClose("RUS")}>
          Russian
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
