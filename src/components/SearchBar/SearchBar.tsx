import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  width?: string;
  padding?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  isLoading,
  placeholder,
  width = "100%",
  padding,
}) => {
  const { t } = useTranslation();
  return (
    <TextField
      sx={{
        width: `${width}`,
        padding: `${padding}`,
        "& .MuiInputBase-input": {
          height: "auto",
        },
      }}
      variant="outlined"
      size="medium"
      value={searchQuery}
      placeholder={placeholder || t("users.filters.search")}
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
