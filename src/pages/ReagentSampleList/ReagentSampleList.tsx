import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
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
import { useMemo, useState } from "react";

import { PageLoader } from "@/components";
import { ErrorPage } from "@/components/ErrorPage";
import { useGetReagentSampleListQuery } from "@/store";
import { ReagentDetails } from "@/types";

import style from "./ReagentSampleList.module.css";

const PAGE_SIZE = 5;

function getListData(allItems: Array<ReagentDetails>, page: number) {
  const paginated = allItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    visibleItems: paginated,
  };
}

const ReagentSampleList: React.FC = () => {
  const {
    data: reagents = [],
    isLoading,
    isError,
  } = useGetReagentSampleListQuery();

  const [page, setPage] = useState(1);

  const { visibleItems } = useMemo(
    () => getListData(reagents, page),
    [reagents, page]
  );
  const totalPages = Math.ceil(reagents.length / PAGE_SIZE);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <ErrorPage pageName="Reagents and Samples" />;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Reagents And Samples
      </Typography>
      <Box className={style.buttonBox}>
        <Button variant="contained" color="primary">
          Add Reagent
        </Button>
        <Button variant="contained" color="primary">
          Add Sample
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginRight={2}
        ></Box>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>Name</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Category</TableSortLabel>
              </TableCell>
              <TableCell align="right">Structure</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Quantity Left</TableCell>
              <TableCell align="right">Storage Location</TableCell>
              <TableCell align="right">Action Buttons</TableCell>
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
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DescriptionIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={style.pagination}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </Box>
    </Container>
  );
};

export default ReagentSampleList;
