import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useMemo, useState } from "react";

import { PageError, PageLoader } from "@/components";
import { useGetReagentRequestsQuery } from "@/store";
import { RequestsSortColumns, SortDirection } from "@/types";
import { getRequestsListData } from "@/utils/getReagentRequestsData.ts";

import style from "./ReagentRequestTable.module.css";

const PAGE_SIZE = 2;

const ReagentRequestTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<RequestsSortColumns>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const { data: reagentRequests = [], isLoading } =
    useGetReagentRequestsQuery();

  const { visibleItems, totalPages } = useMemo(
    () =>
      getRequestsListData({
        items: reagentRequests,
        sortColumn,
        sortDirection,
        page,
        pageSize: PAGE_SIZE,
      }),
    [reagentRequests, sortColumn, sortDirection, page]
  );
  if (isLoading) return <PageLoader />;
  if (!reagentRequests) {
    return <PageError text="There are no reagent request to show" />;
  }

  const handleSortChange = (property: RequestsSortColumns) => {
    const isAsc = sortColumn !== property || sortDirection === "desc";
    setSortDirection(isAsc ? "asc" : "desc");
    setSortColumn(property);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "name"}
                  direction={sortDirection}
                  onClick={() => handleSortChange("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Structure</TableCell>
              <TableCell align="right">CAS</TableCell>
              <TableCell align="right">Desired Quantity</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "status"}
                  direction={sortDirection}
                  onClick={() => handleSortChange("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">User Comments</TableCell>
              <TableCell align="right">Procurement Comments</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "dateCreated"}
                  direction={sortDirection}
                  onClick={() => handleSortChange("dateCreated")}
                >
                  Date Created
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Date Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleItems?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.structure}</TableCell>
                <TableCell>{row.CAS}</TableCell>
                <TableCell>{row.desiredQuantity}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.userComments}</TableCell>
                <TableCell>{row.procurementComments}</TableCell>
                <TableCell>{row.dateCreated}</TableCell>
                <TableCell>{row.dateModified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={style.pagination}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </Box>
    </>
  );
};

export default ReagentRequestTable;
