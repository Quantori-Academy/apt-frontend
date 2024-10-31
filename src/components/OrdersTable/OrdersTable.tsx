import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";

import { Order, SortType, StatusFilter } from "@/types";
import { getOrdersRows } from "@/utils";

type HeadCell = {
  label: string;
  key: keyof Order;
};

const headCells: readonly HeadCell[] = [
  { label: "Title", key: "title" },
  { label: "Creation Date", key: "creationDate" },
  { label: "Seller", key: "seller" },
  { label: "Status", key: "status" },
];

type OrdersTableProps = {
  searchQuery: string;
  statusFilter: StatusFilter;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  orders: Order[];
};

const OrdersTable: React.FC<OrdersTableProps> = ({
  searchQuery,
  statusFilter,
  page,
  setPage,
  orders,
}) => {
  const [order, setOrder] = useState<SortType>("asc");
  const [orderBy, setOrderBy] = useState<keyof Order>("title");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: keyof Order) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { visibleRows, filteredOrders } = useMemo(
    () =>
      getOrdersRows({
        orderBy,
        orders,
        page,
        searchQuery,
        statusFilter,
        sortType: order,
        rowsPerPage,
      }),
    [order, orderBy, orders, page, rowsPerPage, statusFilter, searchQuery]
  );

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredOrders.length)
      : 0;

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="medium">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.key}
                  sortDirection={orderBy === headCell.key ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.key}
                    direction={orderBy === headCell.key ? order : "asc"}
                    onClick={() => handleRequestSort(headCell.key)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((order) => {
              return (
                <TableRow hover key={order.id}>
                  {headCells.map((cell) => (
                    <TableCell key={cell.key}>
                      {order[cell.key as keyof typeof order]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default OrdersTable;
