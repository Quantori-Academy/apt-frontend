import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  IconButton,
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
import { useTranslation } from "react-i18next";

import { DeclineReagentRequest } from "@/components";
import { useAlertSnackbar } from "@/hooks";
import {
  ReagentRequests,
  RequestedReagent,
  RequestsSortColumns,
  SortDirection,
} from "@/types";
import { formatDate } from "@/utils/formatDate.ts";

type ReagentRequestTableProps = {
  sortColumn: RequestsSortColumns;
  sortDirection: SortDirection;
  onSortChange: (property: RequestsSortColumns) => void;
  visibleItems: ReagentRequests;
};

const statusColors = {
  Declined: "#b22a00",
  Pending: "#ff9800",
  Ordered: "#4caf50",
  Completed: "#4caf50",
};

const ReagentRequestTable: React.FC<ReagentRequestTableProps> = ({
  sortColumn,
  sortDirection,
  onSortChange,
  visibleItems,
}) => {
  const [requestId, setRequestId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const handleSubmit = (severity: "error" | "success") => {
    openSnackbar(
      severity,
      severity === "success" ? "Request Declined" : "Failed to decline request"
    );
  };

  const handleDecline = (id: string) => {
    setModalOpen(true);
    setRequestId(id);
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
                  {t("requests.table.name")}
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                {t("requests.table.Structure")}
              </TableCell>
              <TableCell align="left"> {t("requests.table.CAS")}</TableCell>
              <TableCell align="left">
                {t("requests.table.Desired Quantity")}
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "status"}
                  direction={sortDirection}
                  onClick={() => onSortChange("status")}
                >
                  {t("requests.table.Status")}
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                {t("requests.table.UserComments")}
              </TableCell>
              <TableCell align="left">
                {t("requests.table.ProcurementComments")}
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "dateCreated"}
                  direction={sortDirection}
                  onClick={() => onSortChange("dateCreated")}
                >
                  {t("requests.table.CreationDate")}
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                {t("requests.table.ModifiedDate")}
              </TableCell>
              <TableCell align="left">{t("requests.table.Actions")}</TableCell>
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
                <TableCell
                  sx={{
                    color: statusColors[row.status],
                  }}
                >
                  {t(`requests.statusFilter.${row.status}`)}
                </TableCell>
                <TableCell align="left">{row.userComment}</TableCell>
                <TableCell align="left">{row.procurementComment}</TableCell>
                <TableCell>{formatDate(row.dateCreated)}</TableCell>
                <TableCell>{formatDate(row.dateModified)}</TableCell>
                <TableCell>
                  <IconButton
                    title={t("requests.table.actionButtons.decline")}
                    onClick={() => handleDecline(row.id)}
                  >
                    <HighlightOffIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeclineReagentRequest
        onDeclineSubmit={handleSubmit}
        id={requestId}
        onClose={() => setModalOpen(false)}
        modalOpen={modalOpen}
      />

      {SnackbarComponent()}
    </>
  );
};

export default ReagentRequestTable;
