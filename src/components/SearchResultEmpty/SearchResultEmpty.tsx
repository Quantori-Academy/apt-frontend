import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const SearchResultEmpty: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pt="85px"
      sx={{ textAlign: "center", color: "grey.500" }}
    >
      <SearchIcon sx={{ fontSize: 40, mb: 2 }} />
      <Typography variant="h6">{t("emptyList.noResultFound")}</Typography>
    </Box>
  );
};

export default SearchResultEmpty;
