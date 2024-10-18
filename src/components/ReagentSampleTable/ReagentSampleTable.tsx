import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
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

import { ReagentDetails, SortColumn, SortDirection } from "@/types";

type ReagentSampleTableProps = {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSortChange: (property: SortColumn) => void;
  visibleItems: Array<ReagentDetails>;
};
const ReagentSampleTable: React.FC<ReagentSampleTableProps> = ({
  sortColumn,
  onSortChange,
  sortDirection,
  visibleItems,
}) => {
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
              key={reagent.name}
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
                <IconButton title="Delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton title="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton title="Details">
                  <DescriptionIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReagentSampleTable;
