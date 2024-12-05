import { Typography } from "@mui/material";
import type { ReactNode } from "react";

type DetailItemProps = {
  value: ReactNode;
  label?: string;
  color?: string;
};

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  color = "",
}) => (
  <Typography sx={{ display: "flex" }}>
    <Typography component="span" fontWeight="bold" marginRight={1}>
      {label}:
    </Typography>
    <Typography component="span" color={color}>
      {value}
    </Typography>
  </Typography>
);
export default DetailItem;
