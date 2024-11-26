import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Checkbox,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  DeclineReagentRequest,
  EditReagentRequest,
  PageError,
} from "@/components";
import { ScrollableTable } from "@/components/ScrollableTable";
import { statusColors, userRoles } from "@/constants";
import { Severity, useAlertSnackbar, useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";
import {
  ReagentRequests,
  RequestedReagent,
  RequestsSortColumns,
  SortDirection,
} from "@/types";
import { formatDate } from "@/utils";

type ReagentRequestTableProps = {
  sortColumn: RequestsSortColumns;
  sortDirection: SortDirection;
  visibleItems: ReagentRequests;
  selected: Array<string>;
  pendingItems: ReagentRequests;
  onSortChange: (property: RequestsSortColumns) => void;
  isSelected: (id: string) => boolean;
  handleSelectAllClick: (isChecked: boolean) => void;
  toggleCheckbox: (id: string) => void;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  onChangePageSize: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ReagentRequestTable: React.FC<ReagentRequestTableProps> = ({
  sortColumn,
  sortDirection,
  visibleItems,
  selected,
  pendingItems,
  onSortChange,
  isSelected,
  handleSelectAllClick,
  toggleCheckbox,
  totalPages,
  page,
  setPage,
  rowsPerPage,
  onChangePageSize,
}) => {
  const [requestId, setRequestId] = useState("");
  const [editRequest, setEditRequest] = useState<RequestedReagent>({
    id: "",
    name: "",
    structure: "",
    CAS: "",
    desiredQuantity: "",
    status: "Pending",
    userComment: "",
    procurementComment: "",
    dateCreated: "",
    dateModified: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const { t } = useTranslation();
  const role = useAppSelector(selectUserRole);

  const { showSuccess, showError } = useAlertSnackbar();

  const handleSubmit = (severity: Severity, errorMessage: string) => {
    if (severity === "success") {
      showSuccess(errorMessage);
    } else {
      showError(errorMessage);
    }
  };

  const handleDecline = (id: string) => {
    setModalOpen(true);
    setRequestId(id);
  };

  const handleEdit = useCallback(
    (index: number, id: string) => {
      setDetailsModalOpen(true);
      setEditRequest(visibleItems[index]);
      setRequestId(id);
    },
    [visibleItems, setDetailsModalOpen, setEditRequest]
  );

  if (visibleItems.length === 0) {
    return <PageError text="There is no reagent request" />;
  }

  return (
    <>
      <ScrollableTable
        paginationComponent={
          <TablePagination
            sx={{ backgroundColor: "#f5f5f5" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalPages}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, page) => setPage(page)}
            onRowsPerPageChange={onChangePageSize}
          />
        }
      >
        <TableHead>
          <TableRow>
            {role === userRoles.ProcurementOfficer &&
              (pendingItems.length !== 0 ? (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < pendingItems.length
                    }
                    checked={
                      pendingItems.length > 0 &&
                      selected.length === pendingItems.length
                    }
                    onChange={(event) =>
                      handleSelectAllClick(event.target.checked)
                    }
                  />
                </TableCell>
              ) : (
                <TableCell />
              ))}
            <TableCell>
              <TableSortLabel
                active={sortColumn === "name"}
                direction={sortDirection}
                onClick={() => onSortChange("name")}
              >
                {t("requests.table.name")}
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">{t("requests.table.Structure")}</TableCell>
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
          {visibleItems?.map((row: RequestedReagent, index) => (
            <TableRow
              key={row.id}
              selected={row.status === "Pending" ? isSelected(row.id) : false}
              onClick={
                role === userRoles.ProcurementOfficer &&
                row.status === "Pending"
                  ? () => toggleCheckbox(row.id)
                  : undefined
              }
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {role === userRoles.ProcurementOfficer &&
                (row.status === "Pending" ? (
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isSelected(row.id)} />
                  </TableCell>
                ) : (
                  <TableCell />
                ))}

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
                {role === userRoles.ProcurementOfficer &&
                  row.status === "Pending" && (
                    <IconButton
                      title={t("requests.table.actionButtons.decline")}
                      onClick={() => handleDecline(row.id)}
                    >
                      <HighlightOffIcon color="error" />
                    </IconButton>
                  )}
                {role === userRoles.Researcher && row.status === "Pending" && (
                  <IconButton
                    title="Edit"
                    onClick={() => handleEdit(index, row.id)}
                  >
                    <EditIcon color="disabled" />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollableTable>

      <DeclineReagentRequest
        id={requestId}
        modalOpen={modalOpen}
        onDeclineSubmit={handleSubmit}
        onClose={() => setModalOpen(false)}
      />
      <EditReagentRequest
        modalOpen={detailsModalOpen}
        request={editRequest}
        requestId={requestId}
        onClose={() => setDetailsModalOpen(false)}
        onEditSubmit={handleSubmit}
      />
    </>
  );
};

export default ReagentRequestTable;
