import { Typography } from "@mui/material";

type ErrorPageProps = {
  text: string;
};

const PageError: React.FC<ErrorPageProps> = ({ text }) => {
  return (
    <Typography
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
      variant="h5"
    >
      {text}
    </Typography>
  );
};

export default PageError;
