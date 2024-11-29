import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { ScrollableTable } from "@/components";
import { RouteProtectedPath } from "@/router";
import { AddedSubstance } from "@/types";

type AddedSubstancesTableProps = {
  addedSubstances: AddedSubstance[];
};

const AddedSubstancesTable: React.FC<AddedSubstancesTableProps> = ({
  addedSubstances,
}) => {
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const showPagination = addedSubstances.length > 5;

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const visibleRows = addedSubstances.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - addedSubstances.length)
      : 0;

  return (
    <ScrollableTable
      size="small"
      paginationComponent={
        showPagination ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={addedSubstances.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("orders.table.Pagination.RowsPerPage")}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} ${t("orders.table.Pagination.of")} ${count !== -1 ? count : `${t("orders.table.Pagantion.moreThan")} ${to}`}`
            }
          />
        ) : null
      }
    >
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell align="right">Added amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {visibleRows.map((addedSubstance) => (
          <TableRow key={addedSubstance.id}>
            <TableCell>
              <NavLink
                to={
                  addedSubstance.category === "Reagent"
                    ? RouteProtectedPath.reagentPage.replace(
                        ":id",
                        String(addedSubstance.id)
                      )
                    : RouteProtectedPath.samplePage.replace(
                        ":id",
                        String(addedSubstance.id)
                      )
                }
              >
                {addedSubstance.name}
              </NavLink>
            </TableCell>
            <TableCell>{addedSubstance.description || "-"}</TableCell>
            <TableCell align="right">{addedSubstance.addedAmount}</TableCell>
          </TableRow>
        ))}
        {emptyRows > 0 && (
          <TableRow
            style={{
              height: 33 * emptyRows,
            }}
          >
            <TableCell colSpan={5} />
          </TableRow>
        )}
      </TableBody>
    </ScrollableTable>
  );
};

export default AddedSubstancesTable;
