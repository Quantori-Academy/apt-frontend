import { Typography } from "@mui/material";

type DetailItemProps = {
  label: string;
  value: string | number;
};

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <Typography>
    <Typography component="span" fontWeight="bold" marginRight={1}>
      {label}:{""}
    </Typography>
    {value}
  </Typography>
);
export default DetailItem;
