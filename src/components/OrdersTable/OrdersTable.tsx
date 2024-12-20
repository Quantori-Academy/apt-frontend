import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { type ChangeEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ScrollableTable, SearchResultEmpty } from "@/components";
import { ORDER_STATUS_COLORS } from "@/constants";
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
  page: number;
  statusFilter: StatusFilter;
  orders: Order[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const OrdersTable: React.FC<OrdersTableProps> = ({
  searchQuery,
  page,
  statusFilter,
  orders,
  setPage,
}) => {
  const { t } = useTranslation();

  const [order, setOrder] = useState<SortType>("desc");
  const [orderBy, setOrderBy] = useState<keyof Order>("createdAt");

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
        searchQuery: searchQuery.toLowerCase(),
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

  if (!visibleRows.length) return <SearchResultEmpty />;

  return (
    <ScrollableTable
      paginationComponent={
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
            `${from}-${to} ${t("orders.table.Pagination.of")} ${count !== -1 ? count : `${t("orders.table.Pagination.moreThan")} ${to}`}`
          }
        />
      }
    >
      <TableHead>
        <TableRow>
          {headCells.map(({ key, label }) => (
            <TableCell
              key={key}
              sortDirection={orderBy === key ? order : false}
            >
              <TableSortLabel
                active={orderBy === key}
                direction={orderBy === key ? order : "asc"}
                onClick={() => handleRequestSort(key)}
              >
                {t(`orders.table.${label}`)}
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
              navigate(RouteProtectedPath.orderPage.replace(":id", order.id))
            }
            key={order.id}
            sx={{ cursor: "pointer" }}
          >
            {headCells.map(({ key }) => {
              let value;
              let sxStyles = {};
              if (key === "status") {
                value = t(`orders.statuses.${order[key]}`);
                sxStyles = { color: ORDER_STATUS_COLORS[order[key]] };
              } else if (key === "createdAt" || key === "modifiedAt") {
                value = formatDate(order[key] || null);
              } else {
                value = order[key] || "-";
              }
              return (
                <TableCell sx={sxStyles} key={key}>
                  {value}
                </TableCell>
              );
            })}
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
    </ScrollableTable>
  );
};
export default OrdersTable;
