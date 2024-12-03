import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isLoading?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  isLoading,
}) => {
  const { t } = useTranslation();
  return (
    <TextField
      sx={{
        width: "100%",
        "& .MuiInputBase-input": {
          height: "auto",
        },
      }}
      variant="outlined"
      size="medium"
      value={searchQuery}
      placeholder={t("users.filters.search")}
      onChange={(e) => setSearchQuery(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <IconButton>
                <SearchIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
