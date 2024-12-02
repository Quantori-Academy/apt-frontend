import DescriptionIcon from "@mui/icons-material/Description";
import {
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ScrollableTable, SmilesImage } from "@/components";
import { RouteProtectedPath } from "@/router";
import {
  SortColumn,
  SortDirection,
  SubstancesCategory,
  SubstancesDetails,
} from "@/types";

type ReagentSampleTableProps = {
  page: number;
  rowsPerPage: number;
  totalPages: number;
  isInLocation: boolean;
  visibleItems: Array<SubstancesDetails>;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSortChange: (property: SortColumn) => void;
  onChangePageSize: (event: ChangeEvent<HTMLInputElement>) => void;
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
  isInLocation,
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
          <TableCell align="right">{t("substances.table.structure")}</TableCell>
          <TableCell align="right">
            {t("substances.table.description")}
          </TableCell>
          <TableCell align="right">
            {t("substances.table.quantityLeft")}
          </TableCell>
          {!isInLocation && (
            <TableCell align="right">
              {t("substances.table.storageLocation")}
            </TableCell>
          )}
          <TableCell align="right">{t("substances.table.actions")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {visibleItems.map((reagent, index) => (
          <TableRow
            key={`${reagent.id}${index}`}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {reagent.name}
            </TableCell>
            <TableCell align="left">
              {t(`substances.filters.options.${reagent.category}`)}
            </TableCell>
            <TableCell align="right">
              <SmilesImage
                index={index}
                smiles={reagent.structure}
                svgOptions={{ width: 100, height: 100 }}
              />
            </TableCell>
            <TableCell align="center">{reagent.description}</TableCell>
            <TableCell align="right">{reagent.quantityLeft}</TableCell>
            {"storageLocation" in reagent && (
              <TableCell align="right">{reagent.storageLocation}</TableCell>
            )}
            <TableCell align="right">
              <Tooltip title="Details">
                <IconButton
                  onClick={() => onClickDetails(reagent.category, reagent.id)}
                >
                  <DescriptionIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </ScrollableTable>
  );
};

export default SubstancesTable;
