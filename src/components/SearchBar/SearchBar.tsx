import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
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
      placeholder="Search..."
      onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
