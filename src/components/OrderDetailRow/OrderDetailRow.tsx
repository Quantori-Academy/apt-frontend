import { TableCell, TableRow, Typography } from "@mui/material";

type OrderDetailRowProps = {
  label: string;
  value: string | number | null | undefined;
};

const OrderDetailRow: React.FC<OrderDetailRowProps> = ({ label, value }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography fontWeight="bold">{label}:</Typography>
      </TableCell>
      <TableCell align="center">{value || "-"}</TableCell>
    </TableRow>
  );
};

export default OrderDetailRow;
