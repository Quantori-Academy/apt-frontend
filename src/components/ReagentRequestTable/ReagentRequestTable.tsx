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
} from "@mui/material";
import React, { useState } from "react";

import { PageError, PageLoader } from "@/components";
import { useGetReagentRequestsQuery } from "@/store";
import { paginateReagentRequestList } from "@/utils/getPaginatedReagentRequests.ts";

import style from "./ReagentRequestTable.module.css";

const PAGE_SIZE = 2;

const ReagentRequestTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data: reagentRequests, isLoading } = useGetReagentRequestsQuery();

  if (isLoading) return <PageLoader />;
  if (!reagentRequests) {
    return <PageError text="There are no reagent request to show" />;
  }

  const paginatedRequests = paginateReagentRequestList(
    reagentRequests,
    page,
    PAGE_SIZE
  );

  const totalPages = Math.ceil(reagentRequests.length / PAGE_SIZE);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Reagent Name</TableCell>
              <TableCell align="right">Structure</TableCell>
              <TableCell align="right">CAS</TableCell>
              <TableCell align="right">Desired Quantity</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">User Comments</TableCell>
              <TableCell align="right">Procurement Comments</TableCell>
              <TableCell align="right">Date Created</TableCell>
              <TableCell align="right">Date Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRequests?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.reagentName}
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
