import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";

import { ReagentRequests, RequestsSortColumns, SortDirection } from "@/types";

type ReagentRequestTableProps = {
  sortColumn: RequestsSortColumns;
  sortDirection: SortDirection;
  onSortChange: (property: RequestsSortColumns) => void;
  visibleItems: ReagentRequests;
};
const ReagentRequestTable: React.FC<ReagentRequestTableProps> = ({
  sortColumn,
  sortDirection,
  onSortChange,
  visibleItems,
}) => {
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
                  onClick={() => onSortChange("name")}
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
                  onClick={() => onSortChange("status")}
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
                  onClick={() => onSortChange("dateCreated")}
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
    </>
  );
};

export default ReagentRequestTable;
