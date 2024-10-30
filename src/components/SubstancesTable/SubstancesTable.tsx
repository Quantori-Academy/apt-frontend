import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ConfirmRemoving, PageLoader } from "@/components";
import { userRoles } from "@/constants";
import { useAlertSnackbar } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { selectUserRole, useDeleteSubstanceMutation } from "@/store";
import {
  SortColumn,
  SortDirection,
  SubstancesCategory,
  SubstancesDetails,
} from "@/types";

type ReagentSampleTableProps = {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSortChange: (property: SortColumn) => void;
  visibleItems: Array<SubstancesDetails>;
};
const SubstancesTable: React.FC<ReagentSampleTableProps> = ({
  sortColumn,
  onSortChange,
  sortDirection,
  visibleItems,
}) => {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [deleteSubstance, { isLoading: isDeleting }] =
    useDeleteSubstanceMutation();

  const { SnackbarComponent, openSnackbar } = useAlertSnackbar();

  const navigate = useNavigate();
  const role = useSelector(selectUserRole);

  const handleDelete = async () => {
    const { error } = await deleteSubstance(deleteItemId);

    if (error) {
      openSnackbar("error", t("substances.snackBarMessages.delete.error"));
    } else {
      openSnackbar("success", t("substances.snackBarMessages.delete.success"));
    }
  };

  if (isDeleting) return <PageLoader />;

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
              <TableCell align="right">
                {t("substances.table.actions")}
              </TableCell>
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
                <TableCell align="right">
                  {t(`substances.filters.options.${reagent.category}`)}
                </TableCell>
                <TableCell align="right">{reagent.structure}</TableCell>
                <TableCell align="right">{reagent.description}</TableCell>
                <TableCell align="right">{reagent.quantityLeft}</TableCell>
                <TableCell align="right">{reagent.storageLocation}</TableCell>
                <TableCell align="right" sx={{ display: "flex" }}>
                  {role === userRoles.Researcher && (
                    <>
                      <IconButton
                        title="Delete"
                        onClick={() => {
                          setIsOpenModal(true);
                          setDeleteItemId(reagent.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
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
      </TableContainer>
      <ConfirmRemoving
        open={isOpenModal}
        modalTitle={""}
        modalText={t("substances.modalMessages.confirmDelete")}
        onDelete={() => handleDelete()}
        onClose={() => setIsOpenModal(false)}
      />
      {SnackbarComponent()}
    </>
  );
};

export default SubstancesTable;
