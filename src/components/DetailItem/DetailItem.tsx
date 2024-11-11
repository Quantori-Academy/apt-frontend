import { Typography } from "@mui/material";

type DetailItemProps = {
  label?: string;
  value: React.ReactNode;
};

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <Typography sx={{ display: "flex" }}>
    <Typography component="span" fontWeight="bold" marginRight={1}>
      {label}:
    </Typography>
    {value}
  </Typography>
);
export default DetailItem;
