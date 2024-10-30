import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { DeclineReagentRequest } from "@/components";
import { useAlertSnackbar } from "@/hooks";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [requestId, setRequestId] = useState("");

  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const handleSubmit = (severity: "error" | "success") => {
    openSnackbar(
      severity,
      severity === "success" ? "Request Declined" : "Faild to decline request"
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
                <TableCell>
                  <Button onClick={() => handleDecline(row.id)}>Decline</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalOpen}>
        <Box
          sx={{
            backgroundColor: "background.paper",
            padding: 2,
            borderRadius: 1,
            outline: "none",
            maxWidth: 400,
            margin: "auto",
            marginTop: "20%",
          }}
        >
          <Typography variant="h6">Decline Message</Typography>

          <DeclineReagentRequest
            onDeclineSubmit={handleSubmit}
            onClose={() => setModalOpen(false)}
            id={Number(requestId)}
          />
        </Box>
      </Modal>
      {SnackbarComponent()}
    </>
  );
};

export default ReagentRequestTable;
