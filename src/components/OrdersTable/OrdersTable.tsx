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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RouteProtectedPath } from "@/router";
import { Order, SortType, StatusFilter } from "@/types";
import { formatDate, getOrdersRows } from "@/utils";

type HeadCell = {
  label: string;
  key: keyof Order;
};

const headCells: readonly HeadCell[] = [
  { label: "Title", key: "title" },
  { label: "Seller", key: "seller" },
  { label: "Creation Date", key: "createdAt" },
  { label: "Modified Date", key: "modifiedAt" },
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
  const { t } = useTranslation();

  const [order, setOrder] = useState<SortType>("asc");
  const [orderBy, setOrderBy] = useState<keyof Order>("title");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

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
                    {t(`orders.table.${headCell.label}`)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((order) => (
              <TableRow
                hover
                onClick={() =>
                  navigate(
                    RouteProtectedPath.orderPage.replace(":id", order.id)
                  )
                }
                key={order.id}
                sx={{ cursor: "pointer" }}
              >
                {headCells.map((cell) => (
                  <TableCell key={cell.key}>
                    {cell.key === "status"
                      ? t(`orders.statuses.${order[cell.key]}`)
                      : cell.key === "createdAt" || cell.key === "modifiedAt"
                        ? formatDate(
                            order[cell.key as keyof typeof order] || null
                          )
                        : order[cell.key as keyof typeof order] || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
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
        labelRowsPerPage={t("orders.table.Pagination.RowsPerPage")}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} ${t("orders.table.Pagination.of")} ${count !== -1 ? count : `${t("orders.table.Pagantion.moreThan")} ${to}`}`
        }
      />
    </Paper>
  );
};
export default OrdersTable;
