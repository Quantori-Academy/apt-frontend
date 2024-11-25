import DescriptionIcon from "@mui/icons-material/Description";
import {
  Divider,
  IconButton,
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
import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { SmilesImage } from "@/components";
import { RouteProtectedPath } from "@/router";
import {
  SortColumn,
  SortDirection,
  SubstancesCategory,
  SubstancesDetails,
} from "@/types";

type ReagentSampleTableProps = {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  visibleItems: Array<SubstancesDetails>;
  onSortChange: (property: SortColumn) => void;
  totalPages: number;
  onChangePageSize: (event: ChangeEvent<HTMLInputElement>) => void;
  rowsPerPage: number;
  page: number;
  setPage: (page: number) => void;
};

const SubstancesTable: React.FC<ReagentSampleTableProps> = ({
  sortColumn,
  sortDirection,
  visibleItems,
  onSortChange,
  totalPages,
  onChangePageSize,
  rowsPerPage,
  page,
  setPage,
}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onClickDetails = (
    category: SubstancesCategory,
    substanceId: string
  ) => {
    if (category === "Reagent")
      navigate(RouteProtectedPath.reagentPage.replace(":id", substanceId));
    else {
      navigate(RouteProtectedPath.samplePage.replace(":id", substanceId));
    }
  };

  return (
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
                {t("substances.table.name")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "category"}
                direction={sortDirection}
                onClick={() => onSortChange("category")}
              >
                {t("substances.table.category")}
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              {t("substances.table.structure")}
            </TableCell>
            <TableCell align="right">
              {t("substances.table.description")}
            </TableCell>
            <TableCell align="right">
              {t("substances.table.quantityLeft")}
            </TableCell>
            <TableCell align="right">
              {t("substances.table.storageLocation")}
            </TableCell>
            <TableCell align="right">{t("substances.table.actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleItems.map((reagent) => (
            <TableRow
              key={reagent.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {reagent.name}
              </TableCell>
              <TableCell align="left">
                {t(`substances.filters.options.${reagent.category}`)}
              </TableCell>
              <TableCell align="right">
                {reagent.structure ? (
                  <SmilesImage
                    smiles={reagent.structure}
                    svgOptions={{ width: 100, height: 100 }}
                    align="flex-end"
                  />
                ) : (
                  t("substanceDetails.fields.noStructure")
                )}
              </TableCell>
              <TableCell align="center">{reagent.description}</TableCell>
              <TableCell align="right">{reagent.quantityLeft}</TableCell>
              <TableCell align="right">{reagent.storageLocation}</TableCell>
              <TableCell align="right">
                <IconButton
                  title="Details"
                  onClick={() => onClickDetails(reagent.category, reagent.id)}
                >
                  <DescriptionIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalPages}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, page) => setPage(page)}
        onRowsPerPageChange={onChangePageSize}
      />
    </TableContainer>
  );
};

export default SubstancesTable;
