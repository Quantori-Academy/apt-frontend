import { Box, Button, Container, Pagination, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { PageLoader } from "@/components";
import { PageError } from "@/components/PageError";
import { useGetReagentSampleListQuery } from "@/store";
import { ReagentDetails, SortColumn, SortDirection } from "@/types";

import ReagentSampleTable from "../../components/ReagentSampleTable/ReagentSampleTable.tsx";

import style from "./ReagentSampleList.module.css";

const PAGE_SIZE = 5;

const getListData = (
  allItems: Array<ReagentDetails>,
  page: number,
  sortColumn: SortColumn,
  sortDirection: SortDirection
) => {
  const sorted = allItems.toSorted((a, b) => {
    const order = a[sortColumn].localeCompare(b[sortColumn]);
    return sortDirection === "asc" ? order : -1 * order;
  });

  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    visibleItems: paginated,
  };
};

const ReagentSampleList: React.FC = () => {
  const {
    data: reagents = [],
    isLoading,
    isError,
  } = useGetReagentSampleListQuery();

  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const totalPages = Math.ceil(reagents.length / PAGE_SIZE);

  const { visibleItems } = useMemo(
    () => getListData(reagents, page, sortColumn, sortDirection),
    [reagents, page, sortColumn, sortDirection]
  );

  const handleSortChange = (property: SortColumn) => {
    const isAsc = sortColumn !== property || sortDirection === "desc";
    setSortDirection(isAsc ? "asc" : "desc");
    setSortColumn(property);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <PageError pageName="Reagents and Samples" />;
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
      <ReagentSampleTable
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        visibleItems={visibleItems}
      />
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
