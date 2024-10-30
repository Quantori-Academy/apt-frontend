import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useState } from "react";

import { DeclineReagentRequest } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import {
  ReagentRequests,
  RequestedReagent,
  RequestsSortColumns,
  SortDirection,
} from "@/types";

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
  const [requestId, setRequestId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const handleSubmit = (severity: "error" | "success") => {
    openSnackbar(
      severity,
      severity === "success" ? "Request Declined" : "Failed to decline request"
    );
  };

  const handleDecline = (id: number) => {
    setModalOpen(true);
    setRequestId(String(id));
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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleItems?.map((row: RequestedReagent) => (
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
                <TableCell>
                  <Button onClick={() => handleDecline(row.id)}>Decline</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeclineReagentRequest
        onDeclineSubmit={handleSubmit}
        id={Number(requestId)}
        onClose={() => setModalOpen(false)}
        modalOpen={modalOpen}
      />

      {SnackbarComponent()}
    </>
  );
};

export default ReagentRequestTable;
