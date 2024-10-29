import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { PageError, PageLoader } from "@/components";
import { useGetReagentRequestsQuery } from "@/store";

const ReagentRequestTable: React.FC = () => {
  const { data: reagentRequests, isLoading } = useGetReagentRequestsQuery();

  if (isLoading) return <PageLoader />;
  if (!reagentRequests) {
    return <PageError text="There are no reagent request to show" />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reagent Name</TableCell>
            <TableCell align="right">Structure</TableCell>
            <TableCell align="right">CAS</TableCell>
            <TableCell align="right">Desired Quantity</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">User Comments</TableCell>
            <TableCell align="right">Procurement Comments</TableCell>
            <TableCell align="right">Date Created</TableCell>
            <TableCell align="right">Date Modified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reagentRequests?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.reagentName}
              </TableCell>
              <TableCell align="right">{row.structure}</TableCell>
              <TableCell align="right">{row.CAS}</TableCell>
              <TableCell align="right">{row.desiredQuantity}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.userComments}</TableCell>
              <TableCell align="right">{row.procurementComments}</TableCell>
              <TableCell align="right">{row.dateCreated}</TableCell>
              <TableCell align="right">{row.dateModified}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReagentRequestTable;
