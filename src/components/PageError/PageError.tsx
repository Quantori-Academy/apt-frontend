import { Typography } from "@mui/material";

type ErrorPageProps = {
  pageName: string;
};

const PageError: React.FC<ErrorPageProps> = ({ pageName }) => {
  return (
    <Typography
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Failed to load {pageName}. Please try again later.
    </Typography>
  );
};

export default PageError;
