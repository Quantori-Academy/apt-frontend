import { Typography } from "@mui/material";

type DetailItemProps = {
  label: string;
  value: string | number;
};

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <Typography>
    <strong>{label}:</strong> {value}
  </Typography>
);
export default DetailItem;
