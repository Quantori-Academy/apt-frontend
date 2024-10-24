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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ConfirmRemoving, PageLoader } from "@/components";
import { userRoles } from "@/constants";
import { useAlertSnackbar } from "@/hooks";
import { selectUserRole, useDeleteSubstanceMutation } from "@/store";
import { SortColumn, SortDirection, SubstancesDetails } from "@/types";

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
      openSnackbar("error", "Failed to delete substance!");
    } else {
      openSnackbar("success", "Substance deleted successfully!");
    }
  };

  if (isDeleting) return <PageLoader />;

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
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "category"}
                  direction={sortDirection}
                  onClick={() => onSortChange("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Structure</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Quantity Left</TableCell>
              <TableCell align="right">Storage Location</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                <TableCell align="right">{reagent.category}</TableCell>
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
                    onClick={() =>
                      navigate(`/substances/reagent/${reagent.id}`)
                    }
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
        modalText={"Are you sure you want to delete this substance?"}
        onDelete={() => handleDelete()}
        onClose={() => setIsOpenModal(false)}
      />
      {SnackbarComponent()}
    </>
  );
};

export default SubstancesTable;
